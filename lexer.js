//TODO a lexer need a token struct

//simple test
function test(name,args,except,then=function(name,v){v?console.log(name+" test ok"):console.assert(false,name+" test fail");}) {
    let f=this[name];
    let res=f.apply(this,[].concat(args));
    let v=JSON.stringify(res.sort()) === JSON.stringify(except.sort());
    if(then){then(name,v);}
    return v;
}
function runtestcases(cases) {
  sucessCounter=0
  for (var item of cases) {
    if(test(item[0],item[1],item[2])){
      sucessCounter++
    }
  }
  console.log("test case [%d/%d] ok",sucessCounter,cases.length);

}


//啊 壮哉乎 递归
function parseParagraph(root) {
    function f(root, token, tokens) {
        for (let i = 0; i < root.childNodes.length; i++) {
            let ele = root.childNodes[i];
            if (ele.nodeType == 1) {
                token["position"].push(i);
                f(ele,token,tokens);
                token = {
                    "position": [],
                    "words": []
                }
            } else if (ele.nodeType == 3) {
                list = parseWords(ele.nodeValue);
                if (list.length > 0) {
                    token["position"].push(i);
                    token["words"] = token["words"].concat(list);
                    tokens.push(token)
                }
            }
        }
    }
    token = {
        "position": [],
        "words": []
    };
    words = [];
    f(root, token, words);
    return words;
}

//状态与条件放在一起
function parseWords(val) {
    function isWords(char) {
        return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === '\'';
    }

    let state = 0;
    let words = [];
    let token = {};
    for (let i = 0; i < val.length; i++) {
        let char = val[i];
        if (isWords(char) && state === 1) {
            token["end"]++;
            token["val"] += val[i];
        } else if (isWords(char) && state === 0) {
            token["start"] = i;
            token["end"] = i;
            token["val"] = val[i];
            state = 1;
        } else if (!isWords(char) && state === 1) {
            token["end"]++;
            if (isNewWord(token["val"])) {
              words.push(token);
            }
            token = {}
            state = 0;
        } else if (!isWords(char) && state === 0) {
            continue;
        }
    }
    if (state == 1) {
        words.push(token)
    }
    return words;
}
testcases=[
  ["parseWords","died and ",[{"start":0,"end":3,"val":"died"},{"start":5,"end":7,"val":"and"}]],
  ["parseParagraph",document.body,[{"position":[1,0],"words":[{"start":13,"end":15,"val":"the"},{"start":17,"end":21,"val":"World"}]},{"position":[5,0],"words":[{"start":3,"end":4,"val":"ga"},{"start":6,"end":7,"val":"de"},{"start":9,"end":11,"val":"fry"},{"start":13,"end":15,"val":"try"},{"start":18,"end":20,"val":"and"},{"start":22,"end":25,"val":"it's"},{"start":27,"end":31,"val":"while"},{"start":33,"end":35,"val":"die"}]}]]
]

//runtestcases(testcases)