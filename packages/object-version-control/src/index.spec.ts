import { describe, expect, it } from 'vitest'
import * as ovc from './index'

describe('This package', () => {
  it('exports ObjectVersionControl', () => {
    expect(ovc.ObjectVersionControl).toBeDefined()
  })

  it('exports mergeResolvers', () => {
    expect(ovc.mergeResolvers).toBeDefined()
  })
})
