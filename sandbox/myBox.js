const Box = x => ({
  do: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

console.log('more ...')

console.log(
  Box([1,2,3,4,5])
    .do(ary => ary.map(x => x * 2))
    .fold(x => x)
)
