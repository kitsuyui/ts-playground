/**
 * find the common ancestor of two commits
 * like git merge-base command, but this is a naive implementation.
 * BSS (Breadth-First Search)
 * @param hashA
 * @param hashB
 * @param getParents
 * @returns
 */
export const findCommonAncestor2 = <HashLike>(
  hashA: HashLike,
  hashB: HashLike,
  getParents: (hash: HashLike) => HashLike[]
): HashLike | null => {
  const visitedA = new Set<HashLike>()
  const visitedB = new Set<HashLike>()

  const queueA: HashLike[] = [hashA]
  const queueB: HashLike[] = [hashB]

  while (queueA.length > 0 || queueB.length > 0) {
    if (queueA.length > 0) {
      // biome-ignore lint/style/noNonNullAssertion: already checked by queueA.length > 0
      const currentA = queueA.shift()!
      if (visitedB.has(currentA)) return currentA
      visitedA.add(currentA)
      queueA.push(...getParents(currentA))
    }

    if (queueB.length > 0) {
      // biome-ignore lint/style/noNonNullAssertion: already checked by queueB.length > 0
      const currentB = queueB.shift()!
      if (visitedA.has(currentB)) return currentB
      visitedB.add(currentB)
      queueB.push(...getParents(currentB))
    }
  }
  return null
}

/**
 * find the common ancestor of multiple commits
 * Note: This implementation is not efficient.
 * It is better to use a more efficient algorithm and cache the retrieved ancestors.
 * @param targets
 * @param getParents
 * @returns
 */
export const findCommonAncestor = <HashLike>(
  targets: HashLike[],
  getParents: (hash: HashLike) => HashLike[]
): HashLike | null => {
  if (targets.length === 0) return null
  if (targets.length === 1) return targets[0]
  // Recursively find the common ancestor of the first two commits
  const common = findCommonAncestor2(targets[0], targets[1], getParents)
  if (common === null) return null
  const newTargets = [common, ...targets.slice(2)]
  return findCommonAncestor(newTargets, getParents)
}

/**
 * find the ancestors of a commit to another commit
 * A -> B -> C -> D -> E
 * And if the target is E and the ancestor is B, then the ancestors are [E, D, C, B]
 * @param target
 * @param ancestor
 * @param getParents
 * @returns
 */
export const findAncestorsWithin = <HashLike>(
  target: HashLike,
  ancestor: HashLike | null,
  getParents: (hash: HashLike) => HashLike[]
): HashLike[] => {
  const visited = new Set<HashLike>()
  const queue: HashLike[] = [target]
  const ancestors: HashLike[] = []
  while (queue.length > 0) {
    // biome-ignore lint/style/noNonNullAssertion: already checked by queue.length > 0
    const current = queue.shift()!
    if (current === ancestor) {
      ancestors.push(current)
      return ancestors
    }
    visited.add(current)
    ancestors.push(current)
    queue.push(...getParents(current).filter((hash) => !visited.has(hash)))
  }
  return []
}

type MergeTarget<HashLike> = {
  commonAncestor: HashLike | null
  descendants: HashLike[]
}

/**
 * Remove duplicate descendant targets
 * For example,
 * if the tree is like this:
 * X -> A -> B -> C -> D
 * X -> A -> E -> F -> G
 * And the specified targets are [C, D, F, G]
 * B, C, E, F are not needed. So the result is [D, G]
 * @param targets
 */
export const calculateMergeTarget = <HashLike>(
  targets: HashLike[],
  getParents: (hash: HashLike) => HashLike[]
): MergeTarget<HashLike> => {
  const commonAncestor = findCommonAncestor(targets, getParents)
  // When there is no common ancestor, all targets are descendants
  if (commonAncestor === null)
    return { commonAncestor: null, descendants: [...targets] }

  // Build a visited counter
  const visitedCounter = countAncestorVisits(
    targets,
    commonAncestor,
    getParents
  )

  const descendants = new Set<HashLike>()
  // The target is a descendant if it is visited only once
  for (const target of targets) {
    if (visitedCounter.get(target) === 1) {
      descendants.add(target)
    }
  }

  return { commonAncestor, descendants: Array.from(descendants) }
}

/**
 * Build a visited counter
 * Count how many times each node is visited as an ancestor of the targets
 * @param targets
 * @param commonAncestor
 * @param getParents
 * @returns
 */
const countAncestorVisits = <HashLike>(
  targets: HashLike[],
  commonAncestor: HashLike,
  getParents: (hash: HashLike) => HashLike[]
): Map<HashLike, number> => {
  const visitedCounter = new Map<HashLike, number>()
  for (const target of targets) {
    const ancestors = findAncestorsWithin(target, commonAncestor, getParents)
    for (const ancestor of ancestors) {
      visitedCounter.set(ancestor, (visitedCounter.get(ancestor) ?? 0) + 1)
    }
  }
  return visitedCounter
}
