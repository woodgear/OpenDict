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

function stateEval(name, event) {
    let node = stateMap[name];
    let res = name;
    for (cond of node) {
        if (typeof cond[0] === "function") {
            if (cond[0](event.val) === true) {
                res = cond[1];
                break;
            }
        } else if (typeof cond[0] === "boolean") {
            if (cond[0]) {
                return cond[1];
            }
        }
    }
    return res;
}

function sicp(start) {
    from = start;
    to = "";
    return function(arg) {
        to = stateEval(from, arg);
        bingEval({
            "from": from,
            "to": to,
            "val": arg
        });
        return sicp(to);
    }
}

function bingEval(arg) {
    for (let fun of bind["*"]["*"]) {
        fun(arg);
    }
    for (let fun of bind[arg["from"]]["*"]) {
        fun(arg);
    }
    for (let fun of bind["*"][arg["to"]]) {
        fun(arg);
    }
    for (let fun of bind[arg["from"]][arg["to"]]) {
        fun(arg);
    }
}

bind = {}

function initBindMap() {
    bind["*"] = {};
    //TODO 不应如此 但如何保证 += 语法正确?
    for (let key in stateMap) {
        bind[key] = {}
        bind["*"][key] = [];
        bind[key]["*"] = [];
        for (let val in stateMap) {
            bind[key][val] = [];
        }
    }
    bind["*"]["*"]=[];
    // console.log(bind);
}

initBindMap();

function parseWords(str) {
    state = sicp("start")
    //现在我知道重载运算符的好处了 bind["*"]["accept"]+= function (){}
    bind["*"]["accept"].push(function() {
        console.log("to accept  ",arguments);
    });
    bind["*"]["accept"].push(function() {
        console.log("to accept 2");
    });
    console.log(bind);

    for (let i = 0; i < str.length; i++) {
        state = state({
            "val": str[i]
        });
    }
}
parseWords("测试数据 目标为the World");

//parseWords("this is a apple")