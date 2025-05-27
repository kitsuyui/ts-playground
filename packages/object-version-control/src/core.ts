import { findAncestorsWithin } from './treeGraph'
import { deepCopy, generateHash } from './utils'

/**
 * Core class
 * - Core of ObjectVersionControl class
 * - This class is a version control system for objects. Like Git, it stores snapshots and commits.
 * - Core only has the core features of ObjectVersionControl.
 *   - commit
 *   - snapshot
 * - Core class doesn't have HEAD, Remote, Sync features.
 */
export class Core<T> {
  private snapshots: SnapshotMap<T>
  private commits: CommitMap
  private hasher: Hasher

  private constructor(
    snapshotMap: SnapshotMap<T>,
    commitMap: CommitMap,
    hasher: Hasher
  ) {
    this.snapshots = snapshotMap
    this.commits = commitMap
    this.hasher = hasher
  }

  /**
   * Create an ObjectVersionControl instance
   * @returns ObjectVersionControl instance
   */
  static create<T>(): Core<T> {
    return new Core(new Map(), new Map(), generateHash)
  }

  // Generate a hash for any given input
  private computeHash(input: unknown): string {
    return this.hasher(JSON.stringify(input))
  }

  hasCommit(hash: HashValue): boolean {
    return this.commits.has(hash)
  }

  /**
   * Create a snapshot of the given data
   * snapshots are immutable
   * @param data
   * @returns
   */
  createSnapshot(data: T): string {
    const copiedData = deepCopy(data)
    const hash = this.computeHash(copiedData)
    if (!this.snapshots.has(hash)) {
      this.snapshots.set(hash, { hash, data: copiedData })
    }
    return hash
  }

  /**
   * Commit a snapshot
   * Commit the given data. The commit is derived from the current head.
   * @param data The data to commit
   * @returns The hash value of the commit
   */
  commit(data: T, parents: HashValue[]): HashValue {
    return this.createCommit(parents, data)
  }

  /**
   * Create a commit with the given targets and data
   * This method creates a commit with multiple parents. In most cases, it is easier to use the commit() method.
   * @param targets The hashes of the parent commits
   * @param data The data to commit
   * @returns The hash value of the commit
   */
  createCommit(parents: HashValue[], data: T): HashValue {
    const snapshotHash = this.createSnapshot(data)
    const timestamp = new Date().getTime()
    const commitInfo: CommitInfo = {
      parents,
      snapshotHash,
      timestamp,
    }
    const commitHash = this.computeHash(commitInfo)
    const commit: Commit = {
      ...commitInfo,
      hash: commitHash,
    }
    this.commits.set(commitHash, commit)
    return commitHash
  }

  /**
   * Get the data of a snapshot by its hash
   * @param hash The hash of the snapshot
   * @returns The data of the snapshot
   */
  getSnapshotData(hash: HashValue): T {
    return this.getSnapshot(hash).data
  }

  /**
   * Get the data of a snapshot by the commit hash
   * @param hash The hash of the commit
   * @returns The data of the snapshot
   */
  getSnapshotDataByCommitHash(hash: HashValue): T {
    const commit = this.getCommit(hash)
    return this.getSnapshotData(commit.snapshotHash)
  }

  /**
   * Get a snapshot by its hash
   * @param hash The hash of the snapshot
   * @returns The snapshot
   */
  getSnapshot(hash: HashValue): Snapshot<T> {
    const snapshot = this.snapshots.get(hash)
    if (!snapshot) throw new Error(`Snapshot ${hash} not found`)
    // Return the copy of the snapshot
    return {
      ...snapshot,
      data: deepCopy(snapshot.data),
    }
  }

  /**
   * Get a commit by its hash
   * @param hash The hash of the commit
   * @returns The commit
   */
  getCommit(hash: HashValue): Commit {
    const commit = this.commits.get(hash)
    if (!commit) throw new Error(`Commit ${hash} not found`)
    // Return the copy of the commit
    return {
      ...commit,
      parents: [...commit.parents], // deep copy
    }
  }

  /**
   * Find the ancestor commit hashes within the target and the base
   * @param target The hash of the target commit
   * @param base The hash of the base commit
   * @returns An array of hash values of the ancestor commits
   */
  findAncestorCommitHashesWithin(
    target: HashValue,
    base: HashValue | null
  ): HashValue[] {
    const hashes = findAncestorsWithin(target, base, (hash) => {
      const commit = this.getCommit(hash)
      return commit.parents
    })
    return hashes
  }

  /**
   * Find commits for the given hashes
   * @param remote Array of hash values
   * @param hashes Array of commits
   */
  findCommitsForHashes(hashes: HashValue[]): Commit[] {
    return hashes.map((hash) => this.getCommit(hash))
  }

  /**
   * Find snapshots for the given commits
   * @param commits Array of commits
   * @returns Array of snapshots
   */
  findSnapshotsForCommits(commits: Commit[]): Snapshot<T>[] {
    return commits.map((commit) => this.getSnapshot(commit.snapshotHash))
  }

  /**
   * Get all sync items for pushing to another repository
   * @returns SyncItems {commits, snapshots}
   */
  getFullSyncItems(): SyncItems<T> {
    return {
      commits: [...this.commits.values()].map((commit) => deepCopy(commit)),
      snapshots: [...this.snapshots.values()].map((snapshot) =>
        deepCopy(snapshot)
      ),
    }
  }

  /**
   * Get sync items between the target and the base
   * @param target Hash value of the target commit
   * @param base Hash value of the base commit
   * @returns SyncItems {commits, snapshots}
   */
  getSyncItemsBetween(target: HashValue, base: HashValue | null): SyncItems<T> {
    const hashes = this.findAncestorCommitHashesWithin(target, base)
    const commits = this.findCommitsForHashes(hashes)
    const snapshots = this.findSnapshotsForCommits(commits)
    return {
      commits,
      snapshots,
    }
  }

  // Sync the snapshots and commits by the given items
  sync(items: SyncItems<T>): void {
    const { commits, snapshots } = items
    for (const snapshot of snapshots) {
      this.storeSnapshot(snapshot)
    }
    for (const commit of commits) {
      this.storeCommit(commit)
    }
  }

  // Store a snapshot when it is verified
  storeSnapshot(snapshot: Snapshot<T>): void {
    if (this.verifySnapshot(snapshot)) {
      this.snapshots.set(snapshot.hash, snapshot)
    }
  }

  // Store a commit when it is verified
  storeCommit(commit: Commit): void {
    if (this.verifyCommit(commit)) {
      this.commits.set(commit.hash, commit)
    }
  }

  /**
   * Verify all snapshots and commits in the repository
   * This is equivalent to `git fsck` in Git
   * if any snapshot or commit is invalid, this method returns false
   * @returns True if all snapshots and commits are valid
   */
  verifyAll(): boolean {
    for (const snapshot of this.snapshots.values()) {
      if (!this.verifySnapshot(snapshot)) return false
    }
    for (const commit of this.commits.values()) {
      if (!this.verifyCommit(commit)) return false
    }
    return true
  }

  // Verify the integrity of a snapshot
  private verifySnapshot(snapshot: Snapshot<T>): boolean {
    const computedHash = this.computeHash(snapshot.data)
    const isValidHash = computedHash === snapshot.hash
    return isValidHash
  }

  // Verify the integrity of a commit
  private verifyCommit(commit: Commit): boolean {
    const { parents, snapshotHash, timestamp } = commit

    // Verify the integrity of the commit hash
    const computedHash = this.computeHash({
      parents,
      snapshotHash,
      timestamp,
    })
    const isValidHash = computedHash === commit.hash
    if (!isValidHash) return false

    // Verify the integrity of the snapshot
    const snapshot = this.snapshots.get(snapshotHash)
    if (!snapshot) return false

    // Otherwise, the commit is valid
    return true
  }
}
