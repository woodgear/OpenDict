//read token from html
function token(str) {
    this.str = str;
}

//从dom对象提取出单词
function lex(dom) {
    function lexerFromString(str) {
        res = []
        const pattern = new RegExp("[a-zA-Z]+['-]?[a-zA-Z]+", "g");
        worlds = str.match(pattern)
        for (val of worlds) {
            res.push(new token(val))
        }
        return res;
    }

    function pickupStr(dom) {
        nodes = [dom];
        res = [];
        while (nodes.length != 0) {
            let node = nodes.shift();
            for (item of node.childNodes) {
                if (item.nodeType == 3) {
                    res.push(item.nodeValue);
                } else if (item.nodeType == 1) {
                    nodes.push(item);
                }
            }
        }
        return res.join("");
    }

    return lexerFromString(pickupStr(dom));
}