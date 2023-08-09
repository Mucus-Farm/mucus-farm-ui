export const getBasisPointsMultiplier = (decimal: number | string) => {
  const decimalLength = decimal.toString().split('.')[1]?.length || 0

  return 10 ** (decimalLength > 1 ? decimalLength - 1 : 0)
}

export const truncate = (decimal: string) => {
  return `${decimal.split('.')[0] as string}.${decimal.split('.')[1]?.slice(0, 2) || 0}`
}