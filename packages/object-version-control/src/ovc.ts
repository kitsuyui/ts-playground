import { Core } from './core'

type CloneResult<T> = [ObjectVersionControl<T>, SyncHead]

/**
 * ObjectVersionControl class
 * @remarks
 * This class is a version control system for objects. Like Git, it stores snapshots and commits.
 * It can hold multiple commits like Git, and it is also possible to merge between commits.
 * Unlike Git,
 * - it does not have concepts like trees. It manages versions of a single object.
 * - it does not have a staging area
 * - it does not have branches.
 * - it does not have a working directory.
 * - it does not have a remote repository. But it can push and pull commits and snapshots to another ObjectVersionControl instance.
 */
export class ObjectVersionControl<T> {
  private base = Core.create<T>()
  private head: HashValue | null = null

  private constructor() {}

  /**
   * Create an ObjectVersionControl instance
   * @returns ObjectVersionControl instance
   */
  static create<T>(): ObjectVersionControl<T> {
    return new ObjectVersionControl()
  }

  /**
   * Create a full clone of the repository
   */
  fullClone(): CloneResult<T> {
    const syncItems = this.base.getFullSyncItems()
    return this.cloneSyncItems(syncItems)
  }

  /**
   * Create a shallow clone of the repository
   */
  shallowClone(): CloneResult<T> {
    const syncItems = this.getShallowSyncItems()
    return this.cloneSyncItems(syncItems)
  }

  private cloneSyncItems(syncItems: SyncItems<T>): CloneResult<T> {
    const ovc = ObjectVersionControl.create<T>()
    ovc.base.sync(syncItems)
    if (this.head !== null) ovc.checkout(this.head)
    const syncHead = {
      local: this.head,
      remote: ovc.head,
    }
    return [ovc, syncHead]
  }

  /**
   * Commit a snapshot
   * Commit the given data. The commit is derived from the current head.
   * @param data The data to commit
   * @returns The hash value of the commit
   */
  commit(data: T): HashValue {
    const targets = this.head ? [this.head] : []
    return this.createCommit(targets, data)
  }

  /**
   * Create a commit with the given targets and data
   * This method creates a commit with multiple parents. In most cases, it is easier to use the commit() method.
   * @param targets The hashes of the parent commits
   * @param data The data to commit
   * @returns The hash value of the commit
   */
  createCommit(targets: HashValue[], data: T): HashValue {
    const hash = this.base.createCommit(targets, data)
    this.checkout(hash)
    return hash
  }

  /**
   * Merge the targets with the resolver
   * Merge multiple commits and commit the result.
   * The failure of the merge is indicated by the Resolver throwing an exception.
   * @param targets The hashes of the commits to merge
   * @param mergeResolver The resolver to merge the commits
   * @returns The hash value of the commit
   */
  merge(targets: HashValue[], mergeResolver: MergeResolver<T>): HashValue {
    const hash = this.plumbingMerge(targets, this.head, mergeResolver)
    this.checkout(hash)
    return hash
  }

  // Merge the targets with the resolver
  private plumbingMerge(
    targets: HashValue[],
    base: HashValue | null,
    mergeResolver: MergeResolver<T>
  ): HashValue {
    if (targets.length === 0) throw new Error('No targets to merge')
    const data = mergeResolver(this, targets, base)
    return this.createCommit(targets, data)
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
   * Get the current data (HEAD commit)
   * @returns The data of the HEAD commit
   * @throws Error when there is no head commit
   */
  getCurrentData(): T {
    if (!this.head) throw new Error('No head commit')
    const headCommit = this.getHead()
    if (!headCommit) throw new Error('No head commit')
    return this.getSnapshotData(headCommit.snapshotHash)
  }

  /**
   * Get a snapshot by its hash
   * @param hash The hash of the snapshot
   * @returns The snapshot
   */
  getSnapshot(hash: HashValue): Snapshot<T> {
    return this.base.getSnapshot(hash)
  }

  /**
   * Get a commit by its hash
   * @param hash The hash of the commit
   * @returns The commit
   */
  getCommit(hash: HashValue): Commit {
    return this.base.getCommit(hash)
  }

  /**
   * Get the head commit
   * The head commit is the latest commit in the repository.
   * When the repository is created, the head is null.
   * @returns The head commit or null
   */
  getHead(): Commit | null {
    return this.head ? this.getCommit(this.head) : null
  }

  /**
   * Checkout a commit
   * Change the head to the given commit.
   * @param hash The hash of the commit
   */
  checkout(hash: HashValue): void {
    if (!this.base.hasCommit(hash)) {
      throw new Error(`Commit ${hash} not found`)
    }
    this.head = hash
  }

  /**
   * Get shallow sync items
   * (Only the head commit and its snapshot)
   * Like `git push --depth=1` and `git clone --depth=1`
   * @returns SyncItems {commits, snapshots}
   */
  getShallowSyncItems(): SyncItems<T> {
    if (this.head === null) {
      return {
        commits: [],
        snapshots: [],
      }
    }
    const headCommit = this.getCommit(this.head)
    return {
      commits: [headCommit],
      snapshots: [this.getSnapshot(headCommit.snapshotHash)],
    }
  }

  /**
   * Get sync items after the known head
   * @param knownHead Hash value of the known head commit
   * @returns SyncItems {commits, snapshots}
   */
  getAfterKnownHeadSyncItems(knownHead: HashValue | null): SyncItems<T> {
    if (this.head === null) {
      return {
        commits: [],
        snapshots: [],
      }
    }
    return this.getSyncItemsBetween(this.head, knownHead)
  }

  /**
   * Get sync items between the target and the base
   * @param target Hash value of the target commit
   * @param base Hash value of the base commit
   * @returns SyncItems {commits, snapshots}
   */
  getSyncItemsBetween(target: HashValue, base: HashValue | null): SyncItems<T> {
    return this.base.getSyncItemsBetween(target, base)
  }

  /**
   * Push commits and snapshots to another repository by last known commit hash
   * @param remoteOvc Another ObjectVersionControl instance
   * @param syncHead The last known commit hash
   */
  push(remoteOvc: ObjectVersionControl<T>, syncHead: SyncHead): SyncHead {
    const syncItems = this.getAfterKnownHeadSyncItems(syncHead.remote)
    return this.pushSyncItems(remoteOvc, syncItems)
  }

  /**
   * Push commits and snapshots to another repository
   * @param remoteOvc
   */
  pushAllCommits(remoteOvc: ObjectVersionControl<T>): SyncHead {
    const syncItems = this.base.getFullSyncItems()
    return this.pushSyncItems(remoteOvc, syncItems)
  }

  private pushSyncItems(
    remoteOvc: ObjectVersionControl<T>,
    syncItems: SyncItems<T>
  ): SyncHead {
    remoteOvc.base.sync(syncItems)
    return {
      local: this.head,
      remote: remoteOvc.head,
    }
  }

  /**
   * Pull commits and snapshots from another repository by last known commit hash
   * @param remoteOvc Another ObjectVersionControl instance
   * @param syncHead
   */
  pull(remoteOvc: ObjectVersionControl<T>, syncHead: SyncHead): SyncHead {
    const syncItems = remoteOvc.getAfterKnownHeadSyncItems(syncHead.local)
    return this.pullSyncItems(remoteOvc, syncItems)
  }

  /**
   * Pull commits and snapshots from another repository
   * @param remoteOvc
   */
  pullAllCommits(remoteOvc: ObjectVersionControl<T>): SyncHead {
    const syncItems = remoteOvc.base.getFullSyncItems()
    return this.pullSyncItems(remoteOvc, syncItems)
  }

  private pullSyncItems(
    remoteOvc: ObjectVersionControl<T>,
    syncItems: SyncItems<T>
  ): SyncHead {
    this.base.sync(syncItems)
    return {
      local: this.head,
      remote: remoteOvc.head,
    }
  }
}
