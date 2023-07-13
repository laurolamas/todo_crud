const text = 'hola'

const jsonWithBrackets = JSON.stringify({text})
const jsonNoBrackets = JSON.stringify(text)

console.log(jsonWithBrackets) // {"text":"hola"}
console.log(jsonNoBrackets) // "hola"