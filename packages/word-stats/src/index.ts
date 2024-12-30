type Word = string
type Document = Word[]
type WordScore = { [word: Word]: number }

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
  const wordCounts: WordScore = {}
  for (const document of documents) {
    for (const word of document) {
      if (!wordCounts[word]) {
        wordCounts[word] = 0
      }
      wordCounts[word]++
    }
  }
  return wordCounts
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
  const wordDocumentCounts: WordScore = {}
  for (const document of documents) {
    const words = extractUniqueWords(document)
    for (const word of words) {
      if (!wordDocumentCounts[word]) {
        wordDocumentCounts[word] = 0
      }
      wordDocumentCounts[word]++
    }
  }
  const wordIDFs: WordScore = {}
  for (const word in wordDocumentCounts) {
    const count = wordDocumentCounts[word]
    wordIDFs[word] = Math.log(documentCount / count)
  }
  return wordIDFs
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
