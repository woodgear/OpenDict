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
        [true, "end"]
    ],
    "accept": [
        [function(arg) {
            return /[A-Za-z_\-\']/.test(arg);
        }, "accept"],
        [true, "end"],
    ],
    "end": [
        [true, "start"]
    ]
}
bindMap = [
    [
        ["*", "accept"],
        [
            function() {
                console.log("to accept  ", arguments);
            },
        ]
    ],
    [
        ["accept", "accept"],
        [
            function() {
                console.log("acc  accept");
            },
            function() {
                console.log("acc  accept 2");
            }
        ]
    ],
]

function parseWords(str) {
    state = sm.init(stateMap,bindMap, "start");
    for (let i = 0; i < str.length; i++) {
        state = state({
            "val": str[i]
        });
    }
}


parseWords("测试数据 目标为the World");

//parseWords("this is a apple")