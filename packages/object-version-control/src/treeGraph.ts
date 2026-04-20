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
): HashLike | null =>
  findCommonAncestorFromStates(
    createAncestorSearchState(hashA),
    createAncestorSearchState(hashB),
    getParents
  )

type AncestorSearchState<HashLike> = {
  queue: HashLike[]
  index: number
  visited: Set<HashLike>
}

const createAncestorSearchState = <HashLike>(
  hash: HashLike
): AncestorSearchState<HashLike> => ({
  queue: [hash],
  index: 0,
  visited: new Set<HashLike>(),
})

const hasQueuedNodes = <HashLike>(
  state: AncestorSearchState<HashLike>
): boolean => state.index < state.queue.length

const advanceAncestorSearchState = <HashLike>(
  state: AncestorSearchState<HashLike>,
  otherVisited: ReadonlySet<HashLike>,
  getParents: (hash: HashLike) => HashLike[]
): {
  state: AncestorSearchState<HashLike>
  common: HashLike | null
} => {
  if (!hasQueuedNodes(state)) {
    return { state, common: null }
  }

  // biome-ignore lint/style/noNonNullAssertion: guarded by hasQueuedNodes(state)
  const current = state.queue[state.index]!
  if (otherVisited.has(current)) {
    return {
      state: { ...state, index: state.index + 1 },
      common: current,
    }
  }

  return {
    state: {
      queue: [...state.queue, ...getParents(current)],
      index: state.index + 1,
      visited: new Set(state.visited).add(current),
    },
    common: null,
  }
}

const advanceAncestorSearchPair = <HashLike>(
  stateA: AncestorSearchState<HashLike>,
  stateB: AncestorSearchState<HashLike>,
  getParents: (hash: HashLike) => HashLike[]
): {
  stateA: AncestorSearchState<HashLike>
  stateB: AncestorSearchState<HashLike>
  common: HashLike | null
} => {
  const advancedA = advanceAncestorSearchState(
    stateA,
    stateB.visited,
    getParents
  )
  if (advancedA.common !== null) {
    return {
      stateA: advancedA.state,
      stateB,
      common: advancedA.common,
    }
  }

  const advancedB = advanceAncestorSearchState(
    stateB,
    advancedA.state.visited,
    getParents
  )
  return {
    stateA: advancedA.state,
    stateB: advancedB.state,
    common: advancedB.common,
  }
}

const hasQueuedSearchStates = <HashLike>(
  stateA: AncestorSearchState<HashLike>,
  stateB: AncestorSearchState<HashLike>
): boolean => hasQueuedNodes(stateA) || hasQueuedNodes(stateB)

const findCommonAncestorFromStates = <HashLike>(
  stateA: AncestorSearchState<HashLike>,
  stateB: AncestorSearchState<HashLike>,
  getParents: (hash: HashLike) => HashLike[]
): HashLike | null => {
  let currentStateA = stateA
  let currentStateB = stateB

  while (hasQueuedSearchStates(currentStateA, currentStateB)) {
    const advanced = advanceAncestorSearchPair(
      currentStateA,
      currentStateB,
      getParents
    )
    if (advanced.common !== null) return advanced.common
    currentStateA = advanced.stateA
    currentStateB = advanced.stateB
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
  const descendants = collectDescendants(targets, visitedCounter)
  return { commonAncestor, descendants }
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
): Map<HashLike, number> =>
  targets.reduce(
    (visitedCounter, target) =>
      mergeAncestorVisitCounts(
        visitedCounter,
        countAncestors(findAncestorsWithin(target, commonAncestor, getParents))
      ),
    new Map<HashLike, number>()
  )

const countAncestors = <HashLike>(
  ancestors: HashLike[]
): Map<HashLike, number> => {
  const counts = new Map<HashLike, number>()
  for (const ancestor of ancestors) {
    counts.set(ancestor, (counts.get(ancestor) ?? 0) + 1)
  }
  return counts
}

const mergeAncestorVisitCounts = <HashLike>(
  left: Map<HashLike, number>,
  right: Map<HashLike, number>
): Map<HashLike, number> => {
  const merged = new Map(left)
  for (const [ancestor, count] of right) {
    merged.set(ancestor, (merged.get(ancestor) ?? 0) + count)
  }
  return merged
}

const collectDescendants = <HashLike>(
  targets: HashLike[],
  visitedCounter: Map<HashLike, number>
): HashLike[] => {
  return Array.from(
    new Set(targets.filter((target) => visitedCounter.get(target) === 1))
  )
}
