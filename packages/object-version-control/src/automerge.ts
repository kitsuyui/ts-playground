import { next as automerge } from '@automerge/automerge'
import * as jsondiffpatch from 'jsondiffpatch'

import type { ObjectVersionControl } from './ovc'
import { deepCopy } from './utils'

/**
 * create AutomergeResolver with given jsondiffpatch options
 * @param jsonpdiffpatchOptions jsondiffpatch options
 * @returns AutomergeResolver
 */
export const createAutomergeResolver = <T extends Record<string, unknown>>(
  jsondiffpatchOptions: jsondiffpatch.Options
) => {
  const jsondiffpatchInstance = jsondiffpatch.create(jsondiffpatchOptions)
  const fn = (
    ovc: ObjectVersionControl<T>,
    targets: HashValue[],
    base: HashValue | null
  ): T => {
    return mergeMain(ovc, jsondiffpatchInstance, targets, base)
  }
  return fn
}

/**
 * AutomergeResolver (default)
 */
export const AutomergeResolver = createAutomergeResolver({})

/**
 * mergeMain
 * @param ovc ObjectVersionControl
 * @param jsondiffpatchInstance jsondiffpatch.DiffPatcher
 * @param targets target commit hashes
 * @param base base commit hash (merge base)
 * @returns merged document
 */
const mergeMain = <T extends Record<string, unknown>>(
  ovc: ObjectVersionControl<T>,
  jsondiffpatchInstance: jsondiffpatch.DiffPatcher,
  targets: HashValue[],
  base: HashValue | null
): T => {
  if (!base) throw new Error('Base commit is required')
  const baseData = ovc.getSnapshotDataByCommitHash(base)
  const baseDoc: automerge.Doc<T> = automerge.from(baseData)
  const docs = []
  for (const hash of targets) {
    const histories = getHistoricalData(hash, base, ovc)
    const forkDoc = cloneAndPatch(baseDoc, histories, jsondiffpatchInstance)
    docs.push(forkDoc)
  }
  const mergedDoc = mergeAll(baseDoc, docs)
  return deepCopy(mergedDoc)
}

// Helper functions merge all docs into one
const mergeAll = <T>(
  baseDoc: automerge.Doc<T>,
  docs: automerge.Doc<T>[]
): automerge.Doc<T> => {
  let mergedDoc = baseDoc
  for (const doc of docs) {
    mergedDoc = automerge.merge(mergedDoc, doc)
  }
  return mergedDoc
}

/**
 * cloneAndPatch
 * create patch from historical data and apply it to the doc
 * @param doc
 * @param historicalData
 * @param jsondiffpatchInstance
 * @returns
 */
const cloneAndPatch = <T>(
  baseDoc: automerge.Doc<T>,
  historicalData: T[],
  jsondiffpatchInstance: jsondiffpatch.DiffPatcher
): automerge.Doc<T> => {
  let newDoc = automerge.clone(baseDoc)
  for (const data of historicalData) {
    const diff = jsondiffpatchInstance.diff(newDoc, data)
    newDoc = automerge.change(newDoc, (doc) => {
      jsondiffpatchInstance.patch(doc, diff)
    })
  }
  return newDoc
}

/**
 * Returns historical data between target and base
 * data are ordered from base to target (old to new)
 * @param target
 * @param base
 * @param ovc
 * @returns
 */
const getHistoricalData = <T>(
  target: HashValue,
  base: HashValue,
  ovc: ObjectVersionControl<T>
): T[] => {
  const syncItems = ovc.getSyncItemsBetween(target, base)
  const snapshots = syncItems.snapshots
  const data = snapshots.map((snapshot) => snapshot.data)
  return data.reverse()
}
