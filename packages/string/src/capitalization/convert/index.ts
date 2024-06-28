import { ALL_CASES, type Case } from '../cases'
import { joinWords } from '../join'
import { splitToWords } from '../split'

const isValidCase = (caseText: string): caseText is Case => {
  return ALL_CASES.includes(caseText as Case)
}

export const convertCase = (text: string, toCase: Case): string => {
  if (!isValidCase(toCase)) {
    throw new Error(`Invalid Case: ${toCase}`)
  }
  const words = splitToWords(text)
  const converted = joinWords(words, toCase)
  return converted
}
