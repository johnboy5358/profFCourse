const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const identity = x => x
const aryMap = fn => xs => Array.prototype.map.call(xs, fn)
const aryFilter = fn => xs => Array.prototype.filter.call(xs, fn)
const aryReduce = (fn, init) => xs => Array.prototype.reduce.call(xs, fn, init)
const splitOn = splitBy => string => String.prototype.split.call(string, splitBy)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const mathMax = aryNums => Math.max.apply(null, aryNums)
const isEven = x => (x % 2) ? !Boolean(x) : Boolean(x)
