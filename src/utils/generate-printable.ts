let s = ""

export const generatePrintable = (includeSpace?: boolean) => {
  for (let i = includeSpace ? 32 : 33; i < 127; i++) {
    s += String.fromCharCode(i)
  }
  return s
}
