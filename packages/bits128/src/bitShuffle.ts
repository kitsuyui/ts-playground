import {
  RijndaelSBox,
  utils,
  xorShuffle as xorShuffleModule,
} from '@kitsuyui/cipher'

const applyMultipleTimes = (input: Uint8Array, times: number): Uint8Array => {
  let output = input
  for (let i = 0; i < times; i++) {
    output = xorShuffleModule.xorShuffle(output)
    output = RijndaelSBox.applySBox(output)
    output = xorShuffleModule.xorShuffle(output)
  }
  return output
}

export const applySBox128bitBigintTo128bitBigint = (input: bigint): bigint => {
  const inputArray = utils.bigint128bitToUint8Array(input)
  const outputArray = applyMultipleTimes(inputArray, 16)
  return utils.uint8ArrayToBigint128bit(outputArray)
}
