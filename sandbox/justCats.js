const Box = x => ({
  pipe: f => Box(f(x)),
  unwrap: f => f(x),
  inspect: () => `Box(${x})`
})

const map = fn => coll => Array.prototype.map.call(coll, fn)
const filter = fn => coll => Array.prototype.filter.call(coll, fn)
const reduce = (fn, init) => coll => Array.prototype.reduce.call(coll, fn, init)

const isACat = str => str.includes('cat')

const animals = ["pink cats", "pink elephants", "white rhinos", "white cats", "blue whales", "pink cats with white spots"]

// extract the strings that contain cats.
function justCats(anyXs) {
  return Box(anyXs)
    .unwrap(filter(isACat))
}

// extract strings that contain 'white spots'.
function whiteSpots(anXxs) {
  return Box(anXxs)
    .unwrap(filter(x => x.includes('white spots')))
}

console.log(justCats(animals))
console.log(whiteSpots(justCats(animals)))
