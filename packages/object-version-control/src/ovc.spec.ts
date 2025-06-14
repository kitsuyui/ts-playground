import { describe, expect, it } from 'vitest'

import { ObjectVersionControl } from './ovc'

describe('ObjectVersionControl', () => {
  it('should commit and retrieve snapshots', () => {
    const ovc = ObjectVersionControl.create()
    // Commit a snapshot
    const commitHash1 = ovc.commit({ key: 'value' })

    // Retrieve the snapshot and commit
    const commit1 = ovc.getCommit(commitHash1)
    expect(commit1).toEqual({
      hash: commitHash1,
      parents: [],
      timestamp: expect.any(Number),
      snapshotHash: expect.any(String),
    })
    const snapshot1 = ovc.getSnapshot(commit1.snapshotHash)
    expect(snapshot1).toEqual({
      hash: expect.any(String),
      data: { key: 'value' },
    })
    expect(ovc.getHead()).toEqual(commit1)
    expect(ovc.getCurrentData()).toEqual({ key: 'value' })

    // Commit another snapshot
    const commitHash2 = ovc.commit({ key: 'value', newKey: 'newValue' })
    // Retrieve the new snapshot and commit
    const commit2 = ovc.getCommit(commitHash2)
    expect(commit2).toEqual({
      hash: commitHash2,
      parents: [commitHash1],
      timestamp: expect.any(Number),
      snapshotHash: expect.any(String),
    })
    const snapshot2 = ovc.getSnapshot(commit2.snapshotHash)
    expect(snapshot2).toEqual({
      hash: expect.any(String),
      data: { key: 'value', newKey: 'newValue' },
    })
    expect(ovc.getHead()).toEqual(commit2)
    expect(ovc.getCurrentData()).toEqual({ key: 'value', newKey: 'newValue' })

    // commit1 should still be the same
    expect(ovc.getCommit(commitHash1)).toEqual(commit1)
    expect(ovc.getSnapshot(commit1.snapshotHash)).toEqual(snapshot1)
  })

  it("doesn't mutate the snapshot data", () => {
    const ovc = ObjectVersionControl.create()
    const snapshotData = { key: 'value' }
    const commitHash = ovc.commit(snapshotData)
    const commit1 = ovc.getCommit(commitHash)
    const snapshot = ovc.getSnapshot(commit1.snapshotHash)
    expect(snapshot.data).toEqual(snapshotData)
    snapshot.data = { key: 'newValue' }
    // The snapshot data should not be mutated
    const commit1New = ovc.getCommit(commitHash)
    const snapshotNew = ovc.getSnapshot(commit1New.snapshotHash)
    expect(snapshotNew.data).toEqual(snapshotData)
  })

  it("doesn't mutate the commit data", () => {
    const ovc = ObjectVersionControl.create()
    const commitData = { key: 'value' }
    const commitHash = ovc.commit(commitData)
    const commit = ovc.getCommit(commitHash)
    const snapshot = ovc.getSnapshot(commit.snapshotHash)
    expect(commit.snapshotHash).toEqual(snapshot.hash)
    commit.snapshotHash = 'non-existent'
    // The commit data should not be mutated
    const commit2 = ovc.getCommit(commitHash)
    const snapshot2 = ovc.getSnapshot(commit2.snapshotHash)
    expect(commit2.snapshotHash).toEqual(snapshot2.hash)
  })

  it('should checkout a commit', () => {
    const ovc = ObjectVersionControl.create()
    const commitHash1 = ovc.commit({ key: 'value' })
    const commitHash2 = ovc.commit({ key: 'value', newKey: 'newValue' })
    const commit1 = ovc.getCommit(commitHash1)
    const commit2 = ovc.getCommit(commitHash2)
    expect(ovc.getHead()).toEqual(commit2)

    // switch to commit1
    ovc.checkout(commitHash1)
    expect(ovc.getHead()).toEqual(commit1)
  })

  it('should push all commits to another OVC', () => {
    const ovc1 = ObjectVersionControl.create()
    const ovc2 = ObjectVersionControl.create()
    const commitHash1 = ovc1.commit({ key: 'value' })
    ovc1.pushAllCommits(ovc2)
    const ovc2Commit1 = ovc2.getCommit(commitHash1)
    const ovc1Commit1 = ovc1.getCommit(commitHash1)
    expect(ovc2Commit1).toEqual(ovc1Commit1)
    const snapshot1 = ovc1.getSnapshot(ovc2Commit1.snapshotHash)
    const snapshot2 = ovc2.getSnapshot(ovc2Commit1.snapshotHash)
    expect(snapshot1).toEqual(snapshot2)
  })

  it('should pull all commits from another OVC', () => {
    const ovc1 = ObjectVersionControl.create()
    const ovc2 = ObjectVersionControl.create()
    const commitHash1 = ovc1.commit({ key: 'value' })
    ovc2.pullAllCommits(ovc1)
    const ovc2Commit1 = ovc2.getCommit(commitHash1)
    const ovc1Commit1 = ovc1.getCommit(commitHash1)
    expect(ovc2Commit1).toEqual(ovc1Commit1)
    const snapshot1 = ovc1.getSnapshot(ovc2Commit1.snapshotHash)
    const snapshot2 = ovc2.getSnapshot(ovc2Commit1.snapshotHash)
    expect(snapshot1).toEqual(snapshot2)
  })

  it('should push some commits to another OVC', () => {
    const ovc1 = ObjectVersionControl.create()
    ovc1.commit({ key: 'value' })
    const [ovc2, syncState] = ovc1.fullClone()
    const commitHash2 = ovc1.commit({ key: 'value', newKey: 'newValue' })
    ovc1.push(ovc2, syncState)
    const ovc2Commit2 = ovc2.getCommit(commitHash2)
    const ovc1Commit2 = ovc1.getCommit(commitHash2)
    expect(ovc2Commit2).toEqual(ovc1Commit2)
  })

  it('should pull some commits from another OVC', () => {
    const ovc1 = ObjectVersionControl.create()
    ovc1.commit({ key: 'value' })
    const [ovc2, syncState] = ovc1.fullClone()
    const commitHash2 = ovc1.commit({ key: 'value', newKey: 'newValue' })
    ovc2.pull(ovc1, syncState)
    const ovc2Commit2 = ovc2.getCommit(commitHash2)
    const ovc1Commit2 = ovc1.getCommit(commitHash2)
    expect(ovc2Commit2).toEqual(ovc1Commit2)
  })

  it('should throw an error when checking out a non-existent commit', () => {
    const ovc = ObjectVersionControl.create()
    expect(() => ovc.checkout('non-existent')).toThrow()
  })
})
