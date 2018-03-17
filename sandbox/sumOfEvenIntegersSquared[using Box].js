const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const map = fn => xs => Array.prototype.map.call(xs, fn)
const filter = fn => xs => Array.prototype.filter.call(xs, fn)
const reduce = (fn, init) => xs => Array.prototype.reduce.call(xs, fn, init)
const identity = x => x

const isEven = x => (x % 2) ? !Boolean(x) : Boolean(x)
const mapSquare = map(x => x * x)
const filterEven = filter(isEven)
const sumAll = reduce((x,y) => x + y, 0)

function sumOfEvenIntegersSquared(ary) {
  return Box(ary)
    .map(filterEven)
    .map(mapSquare)
    .map(sumAll)
    .fold(identity)
}


const result = sumOfEvenIntegersSquared([2, 4, 5, 8, 3, 7])

console.log(result)
console.log((result === 84 ? "Test passed" : "Test failed"))