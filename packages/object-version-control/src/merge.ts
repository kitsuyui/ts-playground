import type { ObjectVersionControl } from './ovc'
import type { HashValue } from './types'

const compareCommitsByLWW = (
  left: { timestamp: number; hash: HashValue },
  right: { timestamp: number; hash: HashValue }
): number => {
  const timestampOrder = right.timestamp - left.timestamp
  if (timestampOrder !== 0) return timestampOrder
  return right.hash.localeCompare(left.hash)
}

/**
 * Merge the targets with the Last-Writer-Wins strategy
 * The latest commit is selected as the winner.
 * Commits with the same timestamp fall back to commit hash order so the
 * result converges regardless of target array order.
 * All other commits are discarded.
 * @param ovc
 * @param targets
 * @returns
 */
const LWWMergeResolver = <T>(
  ovc: ObjectVersionControl<T>,
  targets: HashValue[],
  _base: HashValue | null
): T => {
  if (targets.length === 0) throw new Error('No targets to merge')
  const commits = targets.map((hash) => ovc.getCommit(hash))
  commits.sort(compareCommitsByLWW)
  const latestCommit = commits[0]
  return ovc.getSnapshotData(latestCommit.snapshotHash)
}

export const mergeResolvers = {
  LWW: LWWMergeResolver,
}
