const dict = document.getElementById("dict")
    // dict.style.display = 'block'


class DictView {
    constructor(words) {
        self.dict = document.getElementById("dict")
        self.counter = document.getElementById('counter')
        self.word = document.getElementById('word')
        self.know = document.getElementById("know")
        self.unknow = document.getElementById("unknow")
        self.notword = document.getElementById("notword")
        self.closeAll = document.getElementById("closeAll")

        self.index = 0
        self.totalLength = self.words.length
        if (self.words.length != 0) {
            dict.style.display = "block"
            this.setWord(self.words[self.index])
        }
        self.know.onclick = () => {
            console.log("on know click now show next world")
            this.setWord(self.words[self.index])
        }
        self.unknow.onclick = () => {
            console.log("on unknow click not show next world")
            this.setWord(self.words[self.index])
        }
        self.closeAll.onclick = () => {
            self.dict.style.display = 'none'
        }
    }

    setWord(word) {
        console.log(`on set world ${word}`)
        self.index = self.index + 1;
        console.log(self.word.innerHTML)
        self.counter.innerHTML = `${self.index}/${self.totalLength}`
        self.word.innerHTML = word

    }
}

words = lex(document.body)
new DictView(words)