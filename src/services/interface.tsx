export interface RateType {
  [key: string]: number
}

export interface FxData {
  base: string
  disclaimer: string | null
  license: string
  rates: RateType
  timestamp: Date
}
