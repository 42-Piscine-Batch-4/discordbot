let s = ""

export const generatePrintable = () => {
  for (let i = 33; i < 127; i++) {
    s += String.fromCharCode(i)
  }
  return s
}
