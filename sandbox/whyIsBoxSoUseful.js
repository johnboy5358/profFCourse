const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const map = fn => coll => Array.prototype.map.call(coll, fn)
const filter = fn => coll => Array.prototype.filter.call(coll, fn)
const reduce = (fn, init) => coll => Array.prototype.reduce.call(coll, fn, init)

const double = x => x * 2
const square = x => x * x
const sum = (p, c) => p + c
const numFromStr = x => {
  return typeof x === 'number'
    ? x
    : (typeof x === 'string')
      ? x.match(/([0-9.]*)$/)[1]
      : 0
// ...TBC ... No!
}

const mapDouble = map(double)
const mapSquare = map(square)
const sumAllNums = reduce(sum, 0)
const onlyNumbers = filter(numFromStr)

// Box is composition.
// doubleSquareAndSum : xs -> number
function screenNumbersAndSum(xs) {
  return Box(xs)
    .map(xs => onlyNumbers(xs))
    .map(map(x => typeof x === 'number' ? x : numFromStr(x)))
    .map(xs => map(Number)(xs))
    .fold(xs => sumAllNums(xs))
}

console.log('Box use case ...')

const aryOfAnyType = [1, "cats", 2, 3, "rabbits", "£4.25", "pigs", 5]

console.log(screenNumbersAndSum(aryOfAnyType))
