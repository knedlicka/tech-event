export const rng = (from, to) => {
  const delta = to - from + 1
  const offset = Math.floor(Math.random() * delta)
  return from + offset
}
