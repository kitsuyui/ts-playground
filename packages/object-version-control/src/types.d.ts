type HashValue = string
type Timestamp = number // Unix timestamp

type Hasher = (data: string) => HashValue

// Define types for snapshot and commit
interface Snapshot<T> {
  hash: HashValue
  data: T
}

interface CommitInfo {
  parents: HashValue[]
  timestamp: Timestamp
  snapshotHash: HashValue
  // message: Git has commit messages, but not used in this implementation
}

type Commit = {
  hash: HashValue
} & CommitInfo

type CommitMap = Map<HashValue, Commit>
type SnapshotMap<T> = Map<HashValue, Snapshot<T>>

type MergeResolver<T> = (
  ovc: ObjectVersionControl<T>,
  targets: HashValue[],
  base: HashValue | null
) => T

type DataOnlyMergeResolver<T> = (targets: T[], base: T | null) => T

interface SyncItems<T> {
  commits: Commit[]
  snapshots: Snapshot<T>[]
}

interface SyncHead {
  local: HashValue | null
  remote: HashValue | null
}
