chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "startLex") {
            console.log("start")
            sendResponse({ words: lex(document.body) })
        }
    })