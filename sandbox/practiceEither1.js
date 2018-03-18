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
  ["ERRMSG", "Nothing found"],
  ["mary", "Mary had a little lamb ..."],
  ["larry", "Larry the lounge room lizard"],
  ["peter", "Peter Piper picked a peck of pickled peppercorns"],
  ["jack", "Little Jack Horner sat in a corner..."]
])

const fromNullableOrNotString = x => {
    return (x === null || x === undefined || typeof x !== 'string') ? Left(null) : Right(x)
}

// So with this function we can't yield a null or undefined
// ... which is totally the point and very important in JavaScript!!!!!
const getPhrase = phrases => key => {
  return fromNullableOrNotString(key)
    .fold(
      () => phrases.get("ERRMSG"),
      x => phrases.get(x))
  || phrases.get("ERRMSG")
}

const getPhraseFromRhymes = getPhrase(rhymes)

console.log(getPhraseFromRhymes('peter'))
// => "Peter Piper picked a peck of pickled peppercorns"

console.log(getPhraseFromRhymes('mary'))
// => "Mary had a little lamb ..."

console.log(getPhraseFromRhymes(212))
// => "Nothing found"

console.log(getPhraseFromRhymes({}))
// => "Nothing found"

console.log(getPhraseFromRhymes('john'))
// => "Nothing found"

console.log(getPhraseFromRhymes('jack'))
// => Little Jack Horner sat in a corner...
