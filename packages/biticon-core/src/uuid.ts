export const isValidUUID = (uuid: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    uuid
  )
}

export const uuidToBigInt = (uuid: string): bigint => {
  return BigInt(`0x${uuid.replace(/-/g, '')}`)
}
