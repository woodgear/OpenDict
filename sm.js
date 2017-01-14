//stateMap
//这样的话一个方法就是一个类的实例 可以注入进去 是一种策略模式?
//需要考虑的有性能
//这应该也是种观察者模式吧
function sm() {
    this.stateMap = {};
    this.bindap = {};
    function initBindMap(stateMap,observerMap) {
        console.log(this.bindMap);
        console.log(bindMap);
        bindMap["*"] = {};
        //TODO 不应如此 但如何保证 += 语法正确?
        for (let key in stateMap) {
            bindMap[key] = {}
            bindMap["*"][key] = [];
            bindMap[key]["*"] = [];
            for (let val in stateMap) {
                bindMap[key][val] = [];
            }
        }
        bindMap["*"]["*"] = [];
        console.log(bindMap);

        for(let val of observerMap){
          target=val[0];//要观察的对象
          actionList=val[1];        //应用在对象上的操作
          bindMap[target[0]][target[1]].push(actionList);
        }
        console.log(bindMap);
    }
    //坑啊 js被调用函数的环境是包含了调用函数的参数的 如果名字一样远的就会被近的遮住
   function init(state,observerMap, start) {
        this.stateMap = state;
        initBindMap(state,observerMap);
        return sicp(start);
    };
    function bindEval(arg) {
        for (let fun of bindMap["*"]["*"]) {
            fun(arg);
        }
        for (let fun of bindMap[arg["from"]]["*"]) {
            fun(arg);
        }
        for (let fun of bindMap["*"][arg["to"]]) {
            fun(arg);
        }
        for (let fun of bindMap[arg["from"]][arg["to"]]) {
            fun(arg);
        }
    }
    function stateEval(name, event) {
        let node = stateMap[name];
        let res = name;
        for (cond of node) {
          //TODO 理论上讲 应该是用递归的(应用序)但是DSL的语法无需这么强就算了
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
        let from = start;
        let to = "";
        return function(arg) {
            to = stateEval(from, arg);
            bindEval({
                "from": from,
                "to": to,
                "val": arg
            });
            return sicp(to);
        }
    }

    this.init=init;
}

//哎 js应该怎么写这种模块加载啊
//new 的话应该只是将this的指向改了 每次都是重新创建
//↓ 这样?
this.sm = new sm();