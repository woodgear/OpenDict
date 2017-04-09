class DictView {
    constructor(words) {
        self.dict = document.getElementById("dict")
        self.counter = document.getElementById('counter')
        self.word = document.getElementById('word')
        self.know = document.getElementById("know")
        self.unknow = document.getElementById("unknow")
        self.notword = document.getElementById("notword")
        self.words = words
        self.index = 0
        self.totalLength = words.length
        this._init()

        self.know.onclick = async() => {
            await setknow('misaki', self.words[self.index])
            this._next()
        }
        self.unknow.onclick = async() => {
            await setunknow('misaki', self.words[self.index])
            this._next()
        }
    }
    onDictOver(callback) {
        this.onDictOverCallback = callback
    }

    _init() {
        if (self.totalLength > 0) {
            this.setWord(self.words[0], 1, self.totalLength)
        }
    }

    _next() {
        self.index += 1
        console.log("on next click ", self.index, self.totalLength, self.words[self.index])
        if (self.index == (self.totalLength)) {
            this.show(false)
            console.log("dict over")
            if (this.onDictOverCallback) {
                this.onDictOverCallback()
            }
        }
        this.setWord(self.words[self.index], self.index + 1, self.totalLength)
    }

    show(flag = true) {
        if (flag) {
            self.dict.style.display = 'block'
        } else {
            self.dict.style.display = 'none'
        }
    }

    setWord(word, index, totalLength) {
        self.counter.innerHTML = `${index}/${totalLength}`
        self.word.innerHTML = word
    }
}