const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const moneyToFloat = str => {
  return Box(str)
    .map(s => s.replace('$', ''))
    .fold(r => parseFloat(r))
}
/*
const percentToFloat = str => {
  const stripped = str.replace(/\%/g, '')
  const number = parseFloat(stripped)
  return number * 0.01
}
*/
const percentToFloat = str => {
  return Box(str)
    .map(s => s.replace(/\%/g, ''))
    .fold(r => parseFloat(r * 0.01))
}
/*
const applyDiscount = (price, discount) => {
  const cost = moneyToFloat(price)
  const saving = percentToFloat(discount)
  return `$${(cost - cost * saving)}`
}
*/

/*
const applyDiscount = (price, discount) => {
  const cost = moneyToFloat(price)
  const saving = percentToFloat(discount)
  return `$${(cost - cost * saving)}`
}
*/

const applyDiscount = (price, discount) => {
  const cost = moneyToFloat(price)
  const result = cost - cost * percentToFloat(discount)
  return `$${result}`
}

console.log(applyDiscount("$15", "20%"))
