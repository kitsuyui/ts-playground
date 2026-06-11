export type HashValue = string
export type Timestamp = number // Unix timestamp

export type Hasher = (data: string) => HashValue

// Define types for snapshot and commit
export interface Snapshot<T> {
  hash: HashValue
  data: T
}

export interface CommitInfo {
  parents: HashValue[]
  snapshotHash: HashValue
  // message: Git has commit messages, but not used in this implementation
}

export type Commit = {
  hash: HashValue
  timestamp: Timestamp
} & CommitInfo

export type CommitMap = Map<HashValue, Commit>
export type SnapshotMap<T> = Map<HashValue, Snapshot<T>>

export type DataOnlyMergeResolver<T> = (targets: T[], base: T | null) => T

export interface SyncItems<T> {
  commits: Commit[]
  snapshots: Snapshot<T>[]
}

declare const _syncHeadBrand: unique symbol

/**
 * SyncHead represents the last-known sync positions between two OVC instances.
 * Valid SyncHead values are only produced by push(), pull(), fullClone(), and shallowClone().
 * The opaque brand prevents construction of arbitrary SyncHead literals.
 */
export interface SyncHead {
  readonly [_syncHeadBrand]: undefined
  local: HashValue | null
  remote: HashValue | null
}
