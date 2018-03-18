// const Either = Right || Left
const toLower = str => String.prototype.toLocaleLowerCase(str)

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const rhymes = new Map([
  ["mary", "Mary had a little lamb ..."],
  ["larry", "Larry the lounge room lizard"],
  ["peter", "Peter Piper picked a peck of pickled peppercorns"],
  ["john", "John pie pickle pud"]
])

const fromNullableOrNotString = x => {
    return (x === null || x === undefined || typeof x !== 'string') ? Left(null) : Right(x)
}

// So with this function we can't yield a null or undefined
// ... which is totally the point and very important in JavaScript!!!!!
const giveMeAPhrase = phrases => key => {
  const failMsg = 'Nothing found'
  return fromNullableOrNotString(key)
    .fold(
      () => failMsg,
       x => phrases.get(x)) || failMsg
}

const giveMeAPhraseFromRhymes = giveMeAPhrase(rhymes)

console.log(giveMeAPhraseFromRhymes('peter'))
// => "Peter Piper picked a peck of pickled peppercorns"

console.log(giveMeAPhraseFromRhymes('mary'))
// => "Mary had a little lamb ..."

console.log(giveMeAPhraseFromRhymes(212))
// => "Nothing found"
