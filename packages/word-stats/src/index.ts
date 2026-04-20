type Word = string
type Document = Word[]
type WordScore = { [word: Word]: number }

const countWords = (words: Iterable<Word>): WordScore => {
  const counts: WordScore = {}
  for (const word of words) {
    counts[word] = (counts[word] ?? 0) + 1
  }
  return counts
}

const mergeWordScores = (left: WordScore, right: WordScore): WordScore => {
  const merged: WordScore = { ...left }
  for (const word in right) {
    merged[word] = (merged[word] ?? 0) + right[word]
  }
  return merged
}

const countWordDocumentFrequencies = (documents: Document[]): WordScore =>
  documents.reduce(
    (wordDocumentCounts, document) =>
      mergeWordScores(
        wordDocumentCounts,
        countWords(extractUniqueWords(document))
      ),
    {}
  )

/**
 * Count the number of words in the documents
 * @example
 * ```ts
 * const documents = [
 *  ['a', 'b', 'c'],
 *  ['a', 'b', 'd'],
 * ]
 * const result = wordCount(documents)
 * result // => { a: 2, b: 2, c: 1, d: 1 }
 * ```
 * @param documents - The documents to count words from (array of arrays of words)
 * @returns A dictionary of words and their counts
 */
export const wordCount = (documents: Document[]): WordScore => {
  return documents.reduce(
    (wordCounts, document) => mergeWordScores(wordCounts, countWords(document)),
    {}
  )
}

/**
 * Calculate TF (Term Frequency)
 * @example
 * ```ts
 * const documents = [
 *  ['a', 'b', 'c', 'c],
 *  ['a', 'b', 'd'],
 * ]
 *
 * const result = computeTermFrequencies(documents)
 * result // => [{ a: 0.25, b: 0.25, c: 0.5 }, { a: 0.3333333333333333, b: 0.3333333333333333, d: 0.3333333333333333 }]
 * ```
 * @param documents - The documents to calculate TF from
 * @returns An array of dictionaries of words and their TF
 */
export const computeTermFrequencies = (documents: Document[]): WordScore[] => {
  const tfs: WordScore[] = []
  for (const document of documents) {
    const words = document
    const wordCounts = wordCount([words])
    const wordTFs: WordScore = {}
    for (const word in wordCounts) {
      const count = wordCounts[word]
      wordTFs[word] = count / words.length
    }
    tfs.push(wordTFs)
  }
  return tfs
}

/**
 * Calculate IDF (Inverse Document Frequency)
 * @example
 * ```ts
 * const documents = [
 *   ['a', 'b', 'c'],
 *   ['a', 'b', 'd'],
 * ]
 * const result = computeInverseDocumentFrequency(documents)
 * result // => { a: 0.0, b: 0.0, c: 0.6931471805599453, d: 0.6931471805599453 }
 * ```
 * @param documents - The documents to calculate IDF from
 * @returns A dictionary of words and their IDF
 */
export const computeInverseDocumentFrequency = (
  documents: Document[]
): WordScore => {
  const documentCount = documents.length
  return Object.fromEntries(
    Object.entries(countWordDocumentFrequencies(documents)).map(
      ([word, count]) => [word, Math.log(documentCount / count)]
    )
  )
}

/**
 * Get unique words from the document
 * @example
 * ```ts
 * const document = ['a', 'b', 'c', 'c', 'a']
 * const result = extractUniqueWords([document])
 * result // => new Set(['a', 'b', 'c'])
 * ```
 * @param document - The document to extract unique words from
 * @returns A set of unique words
 */
export const extractUniqueWords = (document: Document): Set<Word> => {
  const words = new Set<Word>()
  for (const word of document) {
    words.add(word)
  }
  return words
}
