const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const aryMap = fn => xs => Array.prototype.map.call(xs, fn)
const splitOn = splitBy => string => String.prototype.split.call(string, splitBy)
const mathMax = aryNums => Math.max.apply(null, aryNums)

const splitOnCommaSpace = splitOn(', ')
const maxNumbers = mathMax(splitOnCommaSpace)

function highestNumber(stringNumbers) {
  return Box(stringNumbers)
    .map(splitOnCommaSpace)
    .map(aryMap(Number))
    .fold(ary => Math.max.apply(null, ary))
}


const numbers = "7, 5, 500, -8, 0, 3, 56, -1000"
const result = highestNumber(numbers)

console.log(result)
console.log((result === 500 ? "Test passed" : "Test failed"))
