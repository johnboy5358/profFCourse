/*
  * So can we tidy this up a bit?
  *  - by making a standalone curried version of the String.replace method we can use pointfree style. 

*/

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
const replace = (org, replaceby) => sourceStr => String.prototype.replace.call(sourceStr, org, replaceby)

const moneyToFloat = str => {
  return Box(str)
    .map(replace('$', ''))            // using pointfree style.
    .fold(parseFloat)
}

const percentToFloat = str => {
  return Box(str)
    .map(replace(/\%/g, ''))          // using pointfree style.
    .fold(r => parseFloat(r * 0.01))
}

const applyDiscount = (price, discount) => {
  const cost = moneyToFloat(price)
  const result = cost - cost * percentToFloat(discount)
  return `$${result}`
}

console.log(applyDiscount("$15", "20%"))
