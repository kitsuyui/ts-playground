export type uint0toInf = number
export type number0to1 = number
export type uint0to255 = number
export type RGB0to1 = [number0to1, number0to1, number0to1]
export type HSV0to1 = [number0to1, number0to1, number0to1]
export type RGB0to256 = [uint0to255, uint0to255, uint0to255]
export type Range0to1 = [number0to1, number0to1]
export interface WaveParameter {
  range: Range0to1
  frequency: number
  phase: number
}
