const conversionMath = (
  value: string,
  initialRate: number,
  finalRate: number,
) => {
  const val = (Number(value) * initialRate) / finalRate
  return val.toFixed(2)
}

export default conversionMath
