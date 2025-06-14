import { describe, expect, it } from 'vitest'

import { toMap, tryAutomerge } from './index'

describe('tryAutomerge', () => {
  const esmAvailable = Number(process.version.match(/v(\d+)/)?.[1]) < 20
  const it_ = esmAvailable ? it.skip : it
  it_('should work', () => {
    const tobe = {
      tasks: [
        {
          description: 'learn Automerge',
          done: true,
          id: '00000000-0000-0000-0000-000000000001',
        },
        {
          description: 'Try the tutorial',
          done: false,
          id: '00000000-0000-0000-0000-000000000002',
        },
        {
          description: 'Understand CRDTs',
          done: false,
          id: '00000000-0000-0000-0000-000000000003',
        },
      ],
    }
    // Set of tasks is same as tobe, but the list order is different
    expect(toMap(tryAutomerge())).toEqual(toMap(tobe))
  })
})
