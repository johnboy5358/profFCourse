const map = fn => coll => Array.prototype.map.call(coll, fn)
const reduce = (fn, init) => coll => Array.prototype.reduce.call(coll, fn, init)

const double = x => x * 2
const sum = (p, c) => p + c

const mapDouble = map(double)
const sumAllNums = reduce(sum, 0)

const Box = x => ({
  do: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

console.log('Box use case ...')

console.log(
  Box([1,2,3,4,5])
    .do(ary => mapDouble(ary))
    .fold(arr => sumAllNums(arr))
)
