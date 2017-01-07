function render(ele, tokens) {
    val = ele.nodeValue
    //从开始到第一个单词
    nodes = []
    let start = 0;
    let end = 0;
    for (var i = 0; i < tokens.length; i++) {
        end = tokens[i].start
        let text = document.createTextNode(val.substring(start, end))
        let p = document.createElement("P");
        nodes.push(text)
        start = tokens[i].end
        p.className += "dict"
        text = document.createTextNode(val.substring(tokens[i].start, tokens[i].end))
        p.appendChild(text)
        nodes.push(p)
    }
    if (tokens[tokens.length - 1].end != val.length) {
        text = document.createTextNode(val.substring(tokens[tokens.length - 1].end, val.length))
        nodes.push(text)
    }


    let p = document.createElement("P");
    for (let e of nodes) {
        p.appendChild(e);
    }
    ele.parentNode.replaceChild(p, ele)
}

function start() {
    words = parseParagraph(document.body);
    for (token of words) {
        render(token.node, token.words)
    }
}
start()
