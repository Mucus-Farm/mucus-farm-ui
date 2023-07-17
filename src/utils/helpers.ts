export const getBasisPointsMultiplier = (decimal: number | string) => {
  const decimalLength = decimal.toString().split('.')[1]?.length || 0

  return 10 ** (decimalLength > 1 ? decimalLength - 1 : 0)
}
