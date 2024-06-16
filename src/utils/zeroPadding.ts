export const zeroPadding = (str: string, len: number) => {
  return (Array(len).fill(0).join('') + str).slice(len * -1)
}
