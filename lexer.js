//TODO str in <a></a>
function node_token(text_node = null, node_words = []) {
    this.node = text_node;
    this.words = node_words;
}

function word_token(start = 0, end = 0, val = "") {
    this.start = start;
    this.end = end;
    this.val = val;
}

//广度优先
function parseParagraph(root) {
    let queue = [root];
    let nodes = []
    while (queue.length != 0) {
        let parent = queue.pop();
        for (let i = 0; i < parent.childNodes.length; i++) {
            let child = parent.childNodes[i];
            if (child.nodeType == 1) {
                queue.push(child)
            } else if (child.nodeType == 3) {
                let list = parseWords(child.nodeValue)
                if (list.length > 0) {
                    nodes.push(new node_token(child, list))
                }
            }
        }
    }
    return nodes;
}


//cond
//DSL
stateMap = {
    "start": [
        [function(arg) {
            return /[A-Za-z]/.test(arg)
        }, "accept"],
        [true, "start"]
    ],
    "accept": [
        [function(arg) {
            return /[A-Za-z_\-\']/.test(arg);
        }, "accept"],
        [true, "start"],
    ],
}

//也许可以将他变成一个api add({from:,to:,fun:,})
bindMap = [
    [
        ["accept", "accept"],
        [
            function(event) {
                let res = event["res"];
                res[res.length - 1]["val"] += event["val"];
                res[res.length - 1]["end"] += 1;
            },
        ]
    ],
    [
        ["start", "accept"],
        [
            function(event) {
                let res = event["res"];
                res.push(new word_token(event["index"], event["index"]+1, event["val"]));
            },
        ]
    ],

]

//如何将值在传递出去? 通过参数是一种方法
//但是不是很美
//但是没副作用啊 T_T
function parseWords(str) {
    state = new sm(stateMap, bindMap, "start");
    res = []
    for (let i = 0; i < str.length; i++) {
        state = state({
            "val": str[i],
            "index": i,
            "res": res
        });
    }
    return res;
}