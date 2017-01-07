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

function isAlpha(str) {
    return /[A-Za-z]/.test(str.toLowerCase())
}
fmap = []

function bind(target, f) {
    //target {form:"accept",to:"end"} or accept
    form = target.form;
    to = target.to
    if (form && to) {
        fmap[form][to] = f
    } else if(form){
      fmap[form]["*"]=f
    }else if (to) {
      fmap["*"][to]=f
    }
}

//调用函数的函数名 嗯 也许应该以继承的形式? 每个类默认给trans一个值?
function trans(to) {
    return stateMap[to];
}

stateMap = {
    start: function(event) {
        console.log("start");
        if (/[A-Za-z]/.test(event.val)) {
            return trans("accept");
        } else {
            return trans("start");
        }
    },
    accept: function(event) {
        console.log("accept");
        if (/[A-Za-z_\-\']/.test(event.val)) {
            return trans("accept");
        } else {
            return trans("end");
        }
    },
    end: function() {
        console.log("end");
        return trans("start")
    }
}

function parseWords(str) {
    state = stateMap.start;
    for (let i = 0; i < str.length; i++) {
        state = state({
            val: str[i]
        })
    }

    // function isWords(char) {
    //     return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === '\'';
    // }
    //
    // let state = 0;
    // let words = [];
    // let token = {};
    // for (let i = 0; i < val.length; i++) {
    //     let char = val[i];
    //     if (isWords(char) && state === 1) {
    //         token["end"]++;
    //         token["val"] += val[i];
    //     } else if (isWords(char) && state === 0) {
    //         token["start"] = i;
    //         token["end"] = i;
    //         token["val"] = val[i];
    //         state = 1;
    //     } else if (!isWords(char) && state === 1) {
    //         token["end"]++;
    //         if (token["val"].length > 1 && isNewWord(token["val"].toLowerCase())) {
    //             words.push(token);
    //         }
    //         token = {}
    //         state = 0;
    //     } else if (!isWords(char) && state === 0) {
    //         continue;
    //     }
    // }
    // if (state == 1 && token["val"].length > 1 && isNewWord(token["val"].toLowerCase())) {
    //     token["end"]++;
    //     words.push(token)
    // }
    // return words;
}

parseWords("this is a apple")
console.log("test");