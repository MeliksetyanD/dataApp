export const clacOriginalNum = (cpi, cpiChange) => {
  let numOfChange = 1 + cpiChange.replace(/%/g, '') / 100

  return cpi / numOfChange
}
