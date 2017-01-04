dict={}

words=["World","ga"]

for (let word of words) {
    dict[word]=true
}

function isNewWord(word) {
  return !dict[word]==true
}
