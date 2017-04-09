chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "startLex" }, function(response) {
        console.log('res', response)
        start(response.words)
    });
});


function start(words) {
    console.log('start')
    getNewWord("misaki", words).then((res) => {
        document.getElementById("loading").style.display = "none"
        const dictView = new DictView(res)
        dictView.onDictOver(() => {
            window.close()
        })
        dictView.show(true)
    })
}