import type { ObjectVersionControl } from './ovc'

/**
 * Merge the targets with the Last-Writer-Wins strategy
 * The latest commit is selected as the winner.
 * All other commits are discarded.
 * @param ovc
 * @param targets
 * @returns
 */
const LWWMergeResolver = <T>(
  ovc: ObjectVersionControl<T>,
  targets: HashValue[],
  base: HashValue | null
): T => {
  if (targets.length === 0) throw new Error('No targets to merge')
  const commits = targets.map((hash) => ovc.getCommit(hash))
  commits.sort((a, b) => b.timestamp - a.timestamp)
  const latestCommit = commits[0]
  return ovc.getSnapshotData(latestCommit.snapshotHash)
}

export const mergeResolvers = {
  LWW: LWWMergeResolver,
}
