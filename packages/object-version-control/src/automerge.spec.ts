import { describe, expect, it } from 'vitest'

import { AutomergeResolver, createAutomergeResolver } from './automerge'
import { ObjectVersionControl } from './ovc'

describe('createAutomergeResolver', () => {
  it('returns a function', () => {
    const resolver = createAutomergeResolver({})
    expect(typeof resolver).toBe('function')
  })

  it('merges two diverged branches combining non-conflicting keys', () => {
    const ovc = ObjectVersionControl.create<Record<string, unknown>>()
    const baseHash = ovc.commit({ key: 'value' })
    const branch1Hash = ovc.commit({ key: 'value', attr1: 'value1' })
    ovc.checkout(baseHash)
    const branch2Hash = ovc.commit({ key: 'value', attr2: 'value2' })
    ovc.checkout(baseHash)

    const resolver = createAutomergeResolver({})
    ovc.merge([branch1Hash, branch2Hash], resolver)

    expect(ovc.getCurrentData()).toEqual({
      key: 'value',
      attr1: 'value1',
      attr2: 'value2',
    })
  })

  it('throws when base is null', () => {
    const ovc = ObjectVersionControl.create<Record<string, unknown>>()
    const hash1 = ovc.commit({ x: 1 })
    const resolver = createAutomergeResolver({})
    expect(() => resolver(ovc, [hash1], null)).toThrow(
      'Base commit is required'
    )
  })
})

describe('AutomergeResolver', () => {
  it('is a function', () => {
    expect(typeof AutomergeResolver).toBe('function')
  })

  it('merges two diverged branches', () => {
    const ovc = ObjectVersionControl.create<Record<string, unknown>>()
    const baseHash = ovc.commit({ key: 'value' })
    const branch1Hash = ovc.commit({ key: 'value', attr1: 'value1' })
    ovc.checkout(baseHash)
    const branch2Hash = ovc.commit({ key: 'value', attr2: 'value2' })
    ovc.checkout(baseHash)

    ovc.merge([branch1Hash, branch2Hash], AutomergeResolver)

    expect(ovc.getCurrentData()).toEqual({
      key: 'value',
      attr1: 'value1',
      attr2: 'value2',
    })
  })
})
