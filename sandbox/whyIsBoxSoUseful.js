const Box = x => ({
  pipe: f => Box(f(x)),
  unwrap: f => f(x),
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
    .pipe(xs => onlyNumbers(xs))
    .pipe(map(x => typeof x === 'number' ? x : numFromStr(x)))
    .pipe(xs => map(Number)(xs))
    .unwrap(xs => sumAllNums(xs))
}

console.log('Box use case ...')

const aryOfAnyType = [1, "cats", 2, 3, "rabbits", "£4.25", "pigs", 5]

console.log(screenNumbersAndSum(aryOfAnyType))
