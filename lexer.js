//read token from html

//从dom对象提取出单词
function lex(dom) {
    const dict = {}

    function lexerFromString(str) {
        res = []
        const pattern = new RegExp("[a-zA-Z]+['-]?[a-zA-Z]+", "g");
        worlds = str.match(pattern)
        for (val of worlds) {
            val = val.trim().toLowerCase()
            if (!dict.hasOwnProperty(val) && val.length >= 2) {
                dict[val] = 0
                res.push(val)
            }
        }
        return res;
    }

    ignoreElement = ['SCRIPT', 'BUTTON']

    function pickupStr(dom) {
        nodes = [dom];
        res = [];
        while (nodes.length != 0) {
            let node = nodes.shift();
            for (item of node.childNodes) {
                if (item.nodeType == 3) {
                    const nodeValue = item.nodeValue
                    res.push(nodeValue)

                } else if (item.nodeType == 1 && !ignoreElement.includes(item.nodeName)) {
                    nodes.push(item)
                }
            }
        }
        return res.join("");
    }

    return lexerFromString(pickupStr(dom));
}