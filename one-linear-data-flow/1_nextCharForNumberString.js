/*
  * Create linear data flow with container style types (Box)
  * Brian Lonsdorf

  * We'll examine how to unnest function calls, capture assignment, and create a
  * linear data flow with a type we call Box. This is our introduction to working
  * with the various container-style types.

*/

function nextCharForNumberString(str) {
  const trimmed = str.trim()
  const number = parseInt(trimmed)
  const nextNumber = number + 1
  return String.fromCharCode(nextNumber)
}

const result1 = nextCharForNumberString('  64  ')
console.log(result1)

// Helper functions
const trim = s => String.prototype.trim.call(s)
const toLower = s => String.prototype.toLowerCase.call(s)
const inc = x => x + 1

// Box type is composition.
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const boxNextCharForNumberString = str =>
  Box(str)
    .map(trim)
    .map(parseInt)
    .map(inc)
    .map(String.fromCharCode)
    .fold(toLower)

console.log(boxNextCharForNumberString('  64  '))
