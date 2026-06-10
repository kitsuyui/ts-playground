import { describe, expect, it } from 'vitest'

import { Core } from './core'

describe('Core', () => {
  it('should commit and retrieve snapshots', () => {
    const core = Core.create()
    // Commit a snapshot
    const commitHash1 = core.commit({ key: 'value' }, [])

    // Retrieve the snapshot and commit
    const commit1 = core.getCommit(commitHash1)
    expect(commit1).toEqual({
      hash: commitHash1,
      parents: [],
      timestamp: expect.any(Number),
      snapshotHash: expect.any(String),
    })
    const snapshot1 = core.getSnapshot(commit1.snapshotHash)
    expect(snapshot1).toEqual({
      hash: expect.any(String),
      data: { key: 'value' },
    })

    // Commit another snapshot
    const commitHash2 = core.commit({ key: 'value', newKey: 'newValue' }, [
      commitHash1,
    ])
    // Retrieve the new snapshot and commit
    const commit2 = core.getCommit(commitHash2)
    expect(commit2).toEqual({
      hash: commitHash2,
      parents: [commitHash1],
      timestamp: expect.any(Number),
      snapshotHash: expect.any(String),
    })
    const snapshot2 = core.getSnapshot(commit2.snapshotHash)
    expect(snapshot2).toEqual({
      hash: expect.any(String),
      data: { key: 'value', newKey: 'newValue' },
    })

    // commit1 should still be the same
    expect(core.getCommit(commitHash1)).toEqual(commit1)
    expect(core.getSnapshot(commit1.snapshotHash)).toEqual(snapshot1)
  })

  it('keep data immutable', () => {
    const data = { key: 'value' }
    const core = Core.create<typeof data>()
    const commitHash = core.commit(data, [])
    const commit1 = core.getCommit(commitHash)
    const snapshot1 = core.getSnapshot(commit1.snapshotHash)
    expect(snapshot1.data).toEqual(data)

    // The snapshot data should not be mutated
    snapshot1.data.key = 'newValue'
    snapshot1.hash = 'non-existent'
    const snapshotData2 = core.getSnapshotDataByCommitHash(commitHash)
    expect(snapshotData2).toEqual(data)

    // The commit data should not be mutated
    commit1.snapshotHash = 'non-existent'
    commit1.parents.push('non-existent')
    commit1.timestamp = 0
    expect(core.getSnapshotDataByCommitHash(commitHash)).toEqual(data)
  })

  it('produces identical hashes for identical data and parents', () => {
    const core1 = Core.create()
    const core2 = Core.create()
    const hash1 = core1.commit({ key: 'value' }, [])
    const hash2 = core2.commit({ key: 'value' }, [])
    expect(hash1).toBe(hash2)
  })

  it('verifies valid repositories', () => {
    const core = Core.create()
    const baseHash = core.commit({ key: 'value' }, [])
    core.commit({ key: 'next' }, [baseHash])

    expect(core.verifyAll()).toBe(true)
  })

  it('detects invalid snapshots during repository verification', () => {
    const core = Core.create()
    const commitHash = core.commit({ key: 'value' }, [])
    const commit = core.getCommit(commitHash)
    const snapshots = (core as unknown as { snapshots: Map<string, unknown> })
      .snapshots

    snapshots.set(commit.snapshotHash, {
      hash: commit.snapshotHash,
      data: { key: 'tampered' },
    })

    expect(core.verifyAll()).toBe(false)
  })

  it('detects invalid commits during repository verification', () => {
    const core = Core.create()
    const commitHash = core.commit({ key: 'value' }, [])
    const commits = (core as unknown as { commits: Map<string, unknown> })
      .commits

    commits.set(commitHash, {
      ...core.getCommit(commitHash),
      snapshotHash: 'missing-snapshot',
    })

    expect(core.verifyAll()).toBe(false)
  })

  it('throws when storing a snapshot with a tampered hash', () => {
    const core = Core.create()
    const tamperedSnapshot = {
      hash: 'fake-hash',
      data: { key: 'value' },
    }
    expect(() => core.storeSnapshot(tamperedSnapshot)).toThrow(
      'Snapshot verification failed'
    )
  })

  it('throws when storing a commit with a tampered hash', () => {
    const core = Core.create()
    const tamperedCommit = {
      hash: 'fake-hash',
      parents: [],
      snapshotHash: 'fake-snapshot',
      timestamp: Date.now(),
    }
    expect(() => core.storeCommit(tamperedCommit)).toThrow(
      'Commit verification failed'
    )
  })

  it('throws during sync when a tampered snapshot is received', () => {
    const core1 = Core.create()
    const core2 = Core.create()
    core1.commit({ key: 'value' }, [])
    const items = core1.getFullSyncItems()

    // tamper the snapshot before syncing
    items.snapshots[0] = { ...items.snapshots[0], hash: 'tampered-hash' }

    expect(() => core2.sync(items)).toThrow('Snapshot verification failed')
  })

  it('prune removes unreachable commits and snapshots', () => {
    const core = Core.create()
    const hash1 = core.commit({ step: 1 }, [])
    const hash2 = core.commit({ step: 2 }, [hash1])
    // Branch from hash1 — hash3 will become unreachable after prune([hash2])
    const hash3 = core.commit({ step: 3, branch: true }, [hash1])

    // Before prune: all 3 commits exist
    expect(core.getCommit(hash1)).toBeDefined()
    expect(core.getCommit(hash2)).toBeDefined()
    expect(core.getCommit(hash3)).toBeDefined()

    // Prune keeping only the hash2 lineage
    core.prune([hash2])

    // hash1 and hash2 are reachable; hash3 is not
    expect(core.getCommit(hash1)).toBeDefined()
    expect(core.getCommit(hash2)).toBeDefined()
    expect(() => core.getCommit(hash3)).toThrow()

    // Repository integrity is maintained for reachable commits
    expect(core.verifyAll()).toBe(true)
  })

  it('prune with empty heads removes all commits and snapshots', () => {
    const core = Core.create()
    core.commit({ x: 1 }, [])
    core.prune([])
    // No reachable roots — everything is removed; verifyAll on empty store is true
    expect(core.verifyAll()).toBe(true)
  })

  it('prune with all heads preserves all commits', () => {
    const core = Core.create()
    const hash1 = core.commit({ a: 1 }, [])
    const hash2 = core.commit({ a: 2 }, [hash1])
    core.prune([hash2])
    expect(core.getCommit(hash1)).toBeDefined()
    expect(core.getCommit(hash2)).toBeDefined()
    expect(core.verifyAll()).toBe(true)
  })

  it('deduplicates snapshots for logically equal objects with different key orders', () => {
    const core = Core.create<Record<string, number>>()
    const h1 = core.commit({ a: 1, b: 2 }, [])
    const h2 = core.commit({ b: 2, a: 1 }, [h1])

    const c1 = core.getCommit(h1)
    const c2 = core.getCommit(h2)
    expect(c1.snapshotHash).toBe(c2.snapshotHash)
  })
})
