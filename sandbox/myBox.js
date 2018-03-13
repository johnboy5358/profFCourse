const Box = x => ({
  apply: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

console.log('more ...')

console.log(
  Box([1,2,3,4,5])
    .apply(x => x.map(y => y * 2))
    .fold(x => x)
)
