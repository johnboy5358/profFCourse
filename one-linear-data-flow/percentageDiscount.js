const replace = (regex, _with) => str => String.prototype.replace.call(str, regex, _with)
const replace$withNullString = replace('$', '')
const replacePercentWithNullString = replace(/\%/g, '')

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const moneyToFloat = str => {
  return Box(str)
    .map(replace$withNullString)
    .fold(r => parseFloat(r))
}

const percentToFloat = str => {
  return Box(str)
    .map(replacePercentWithNullString)
    .fold(r => parseFloat(r * 0.01))
}

const applyDiscount = (price, discount) => {
  const cost = Box(price)
    .map(moneyToFloat)
    .fold(x=>x)
  return `$${cost - cost * percentToFloat(discount)}`
}

console.log(applyDiscount("$15", "20%"))

/*
  * The old way...
  * 
  * const percentToFloat = str => {
      const stripped = str.replace(/\%/g, '')
      const number = parseFloat(stripped)
      return number * 0.01
    }

    const moneyToFloat = str => {
      parseFloat(str.replace(/\$/g, ''))
    }

    const applyDiscount = (price, discount) => {
      const cost = moneyToFloat(price)
      const result = cost - cost * percentToFloat(discount)
      return `$${result}`
    }

*/
