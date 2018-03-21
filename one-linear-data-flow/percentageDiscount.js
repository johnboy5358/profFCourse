const replace = (regex, _with) => str => String.prototype.replace.call(str, regex, _with)
const replace$withNullString = replace('$', '')
const replacePercentWithNullString = replace(/\%/g, '')
const percent = pcent => num => num * pcent / 100
const takeOnePercent = percent(1)
const identity = x => x

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const moneyToFloat = str => {
  return Box(str)
    .map(replace$withNullString)
    .fold(parseFloat)
}

const percentToFloat = str => {
  return Box(str)
    .map(replacePercentWithNullString)
    .fold(takeOnePercent)
}

const applyDiscount = (price, discount) => {
  const cost = Box(price)
    .map(moneyToFloat)
    .fold(identity)
  return `$${cost - cost * percentToFloat(discount)}`
}

console.log((applyDiscount("$15", "20%") === '$12') ? 'Test OK' : 'Test Failed!')
// => Test OK
console.log((applyDiscount("$100", "10%") === '$90') ? 'Test OK' : 'Test Failed!')
// => Test OK
console.log((applyDiscount("$100", "10%") === '$50') ? 'Test OK' : 'Test Failed!')
// => Test Failed!

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
