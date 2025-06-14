import { describe, expect, it } from 'vitest'

import {
  calculateMergeTarget,
  findAncestorsWithin,
  findCommonAncestor,
  findCommonAncestor2,
} from './treeGraph'

describe('findAncestorsWithin', () => {
  it('should find ancestors', () => {
    // dummy getParents function
    const getParents = (hash: string) => {
      switch (hash) {
        case 'E':
          return ['D']
        case 'D':
          return ['C']
        case 'C':
          return ['B']
        case 'B':
          return ['A']
        case 'A':
          return []
        default:
          return []
      }
    }
    expect(findAncestorsWithin('E', 'B', getParents)).toEqual([
      'E',
      'D',
      'C',
      'B',
    ])
  })
  it('should find return empty array if ancestor is not found', () => {
    // dummy getParents function
    const getParents = (hash: string) => {
      switch (hash) {
        case 'E':
          return ['D']
        case 'D':
          return ['C']
        case 'C':
          return ['B']
        case 'B':
          return ['A']
        case 'A':
          return []
        default:
          return []
      }
    }
    expect(findAncestorsWithin('E', 'X', getParents)).toEqual([])
  })
})

describe('findCommonAncestor2', () => {
  it('should find common ancestor', () => {
    // dummy getParents function
    const getParents = (hash: string) => {
      switch (hash) {
        case 'C':
          return ['A']
        case 'B':
          return ['A']
        case 'A':
          return []
        default:
          return []
      }
    }
    expect(findCommonAncestor2('C', 'B', getParents)).toEqual('A')
  })
  it('should find common ancestor even if the target is the ancestor', () => {
    // dummy getParents function
    const getParents = (hash: string) => {
      switch (hash) {
        case 'C':
          return ['B']
        case 'B':
          return ['A']
        case 'A':
          return []
        default:
          return []
      }
    }
    expect(findCommonAncestor2('C', 'B', getParents)).toEqual('B')
  })
  it('should return null if no common ancestor', () => {
    // dummy getParents function
    const getParents = (hash: string) => {
      switch (hash) {
        case 'C':
          return ['X']
        case 'B':
          return ['Y']
        default:
          return []
      }
    }
    expect(findCommonAncestor2('C', 'B', getParents)).toEqual(null)
  })
})

describe('findCommonAncestor', () => {
  it('should find common ancestor even if three targets are given', () => {
    // dummy getParents function
    const getParents = (hash: string) => {
      switch (hash) {
        case 'C':
          return ['A']
        case 'B':
          return ['A']
        case 'D':
          return ['A']
        case 'A':
          return ['X']
        default:
          return []
      }
    }
    expect(findCommonAncestor(['C', 'B', 'D'], getParents)).toEqual('A')
  })
  it('should return null if no common ancestor', () => {
    // dummy getParents function
    const getParents = (hash: string) => {
      switch (hash) {
        case 'C':
          return ['X']
        case 'B':
          return ['Y']
        default:
          return []
      }
    }
    expect(findCommonAncestor(['C', 'B'], getParents)).toEqual(null)
  })
})

describe('distinctDescendantTargets', () => {
  it('should return descendants', () => {
    // dummy getParents function
    /*
    A -> E -> F -> G
    A -> B -> C -> D
    */
    const getParents = (hash: string) => {
      switch (hash) {
        case 'D':
          return ['C']
        case 'C':
          return ['B']
        case 'B':
          return ['A']
        case 'G':
          return ['F']
        case 'F':
          return ['E']
        case 'E':
          return ['A']
        case 'A':
          return []
        default:
          return []
      }
    }
    expect(calculateMergeTarget(['C', 'D', 'F', 'G'], getParents)).toEqual({
      commonAncestor: 'A',
      descendants: ['D', 'G'],
    })
  })
  it('should return all targets if no common ancestor', () => {
    // dummy getParents function
    /*
    X -> C
    Y -> B
    */
    const getParents = (hash: string) => {
      switch (hash) {
        case 'C':
          return ['X']
        case 'B':
          return ['Y']
        default:
          return []
      }
    }
    expect(calculateMergeTarget(['C', 'B'], getParents)).toEqual({
      commonAncestor: null,
      descendants: ['C', 'B'],
    })
  })
})
