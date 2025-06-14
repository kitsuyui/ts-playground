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
})
