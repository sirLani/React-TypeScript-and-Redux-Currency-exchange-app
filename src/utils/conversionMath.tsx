const conversionMath = (
  value: string,
  initialRate: number,
  finalRate: number
) => {
  /* This handles the conversion where value represents the amount that neeeds to be converted and initial rate is the */
  const val = (Number(value) * initialRate) / finalRate
  return val.toFixed(2)
}

export default conversionMath
