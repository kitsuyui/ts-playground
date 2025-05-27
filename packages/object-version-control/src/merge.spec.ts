import { describe, expect, it, vi } from 'vitest'

import { AutomergeResolver } from './automerge'
import { mergeResolvers } from './merge'
import { ObjectVersionControl } from './ovc'

describe('ObjectVersionControl', () => {
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
    expect(ovc.getCurrentData()).toBeOneOf([
      { key: 'value', attr1: 'value1' },
      { key: 'value', attr2: 'value2' },
    ])
  })
})
