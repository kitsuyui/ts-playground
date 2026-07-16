import { afterEach, describe, expect, it, vi } from 'vitest'

import { AutomergeResolver } from './automerge'
import { mergeResolvers } from './merge'
import { ObjectVersionControl } from './ovc'

const getExpectedLWWData = (
  commitHash2: string,
  commitHash3: string,
  ovc: ObjectVersionControl<{ key: string; attr1?: string; attr2?: string }>
) => {
  const commit2 = ovc.getCommit(commitHash2)
  const commit3 = ovc.getCommit(commitHash3)

  if (commit2.timestamp > commit3.timestamp) {
    return { key: 'value', attr1: 'value1' }
  }
  if (commit3.timestamp > commit2.timestamp) {
    return { key: 'value', attr2: 'value2' }
  }
  return commitHash2.localeCompare(commitHash3) > 0
    ? { key: 'value', attr1: 'value1' }
    : { key: 'value', attr2: 'value2' }
}

describe('ObjectVersionControl', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should merge commits', () => {
    const ovc = ObjectVersionControl.create()
    const commitHash1 = ovc.commit({ key: 'value' })
    const commitHash2 = ovc.commit({ key: 'value', attr1: 'value1' })
    ovc.checkout(commitHash1)
    const commitHash3 = ovc.commit({ key: 'value', attr2: 'value2' })
    ovc.checkout(commitHash1)

    ovc.merge([commitHash2, commitHash3], AutomergeResolver)
    expect(ovc.getCurrentData()).toEqual({
      key: 'value',
      attr1: 'value1',
      attr2: 'value2',
    })

    ovc.merge([commitHash2, commitHash3], mergeResolvers.LWW)
    expect(ovc.getCurrentData()).toEqual(
      getExpectedLWWData(commitHash2, commitHash3, ovc)
    )
  })

  it('uses commit hash as a deterministic tie-breaker for LWW', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1234567890)

    const ovc = ObjectVersionControl.create()
    const baseHash = ovc.commit({ key: 'value' })
    const commitHash2 = ovc.commit({ key: 'value', attr1: 'value1' })
    ovc.checkout(baseHash)
    const commitHash3 = ovc.commit({ key: 'value', attr2: 'value2' })

    const expectedData =
      commitHash2.localeCompare(commitHash3) > 0
        ? { key: 'value', attr1: 'value1' }
        : { key: 'value', attr2: 'value2' }

    ovc.merge([commitHash2, commitHash3], mergeResolvers.LWW)
    expect(ovc.getCurrentData()).toEqual(expectedData)

    ovc.checkout(baseHash)
    ovc.merge([commitHash3, commitHash2], mergeResolvers.LWW)
    expect(ovc.getCurrentData()).toEqual(expectedData)
  })
})
