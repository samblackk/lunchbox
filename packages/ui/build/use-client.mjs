export const clientDirective = "'use client'"

const leadingTrivia = /^(?:\s+|\/\/[^\n]*|\/\*[\s\S]*?\*\/)*/
const clientDirectivePattern = /^(['"])use client\1\s*;?/

export const hasUseClientDirective = (code) => {
  const trivia = leadingTrivia.exec(code)
  return clientDirectivePattern.test(code.slice(trivia ? trivia[0].length : 0))
}
