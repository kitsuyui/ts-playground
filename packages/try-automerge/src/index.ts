import { next as automerge } from '@automerge/automerge'

interface Task {
  id: string
  description: string
  done: boolean
}

interface ToDoApp {
  tasks: Task[]
}

export const tryAutomerge = (): ToDoApp => {
  const doc1: automerge.Doc<ToDoApp> = automerge.from({
    tasks: [
      {
        id: '00000000-0000-0000-0000-000000000001',
        description: 'learn Automerge',
        done: false,
      },
    ],
  })
  const doc2 = automerge.clone(doc1)
  const doc1R2 = automerge.change(doc1, (doc) => {
    doc.tasks.push({
      id: '00000000-0000-0000-0000-000000000002',
      description: 'Try the tutorial',
      done: false,
    })
    const learnTask = doc.tasks.find(
      (task) => task.description === 'learn Automerge'
    )
    if (learnTask) learnTask.done = true
  })
  const doc2R2 = automerge.change(doc2, (doc) => {
    doc.tasks.push({
      id: '00000000-0000-0000-0000-000000000003',
      description: 'Understand CRDTs',
      done: false,
    })
    const learnTask = doc.tasks.find(
      (task) => task.description === 'learn Automerge'
    )
    if (learnTask) learnTask.done = true
  })
  const doc1R3 = automerge.merge(doc1R2, doc2R2)
  const doc2R3 = automerge.merge(doc2R2, doc1R2)
  const doc1R4 = automerge.merge(doc1R3, doc2R3) // merge is idempotent
  return doc1R4
}

export const toMap = (todoApp: ToDoApp): Map<string, Task> => {
  return new Map(todoApp.tasks.map((task) => [task.id, task]))
}
