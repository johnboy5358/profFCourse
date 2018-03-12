const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const nextCharForNumberString = str => {
  return Box(str)
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i)[[0]])
    // .inspect()
    .fold(c => c)
}

const testString = "  64  "

console.log(nextCharForNumberString(testString))
