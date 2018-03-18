// Box sweet composition.
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

// Either composable branching 
const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

// General functions
const identity = x => x
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

// Array functions
const aryMap = fn => xs => Array.prototype.map.call(xs, fn)
const aryFilter = fn => xs => Array.prototype.filter.call(xs, fn)
const aryReduce = (fn, init) => xs => Array.prototype.reduce.call(xs, fn, init)

// String functions
const splitOn = splitBy => string => String.prototype.split.call(string, splitBy)
const replace = (org, replaceby) => sourceStr => String.prototype.replace.call(sourceStr, org, replaceby)
const strContains = (match, posn) => source => String.prototype.includes.call(source, match, posn)

// Maths functions
const mathMax = aryNums => Math.max.apply(null, aryNums)
const isEven = x => (x % 2) ? !Boolean(x) : Boolean(x)
