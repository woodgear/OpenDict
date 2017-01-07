// TODO need a singleton?
dict={}
function counterfeit() {
  data=["ga"]

  for (let word of data) {
      dict[word]=true
  }
}
counterfeit()

function isNewWord(word) {
  return !dict[word]==true
}
