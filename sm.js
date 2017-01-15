//stateMap
//这样的话一个方法就是一个类的实例 可以注入进去 是一种策略模式?
//需要考虑的有性能
//这应该也是种观察者模式吧


//总感觉怪怪的 没能理解我写了什么

function sm(sm, bm, start) {
    this.init(sm, bm);
    return this.sicp(start);
}
sm.prototype.init = function(sm, bm) {
    this.bindMap = {}
    this.stateMap = sm;
    let bindMap = this.bindMap;
    bindMap["*"] = {};
    //TODO 不应如此 但如何保证 += 语法正确?
    for (let key in this.stateMap) {
        bindMap[key] = {}
        bindMap["*"][key] = [];
        bindMap[key]["*"] = [];
        for (let val in this.stateMap) {
            bindMap[key][val] = [];
        }
    }
    bindMap["*"]["*"] = [];
    for (let val of bm) {
        target = val[0]; //要观察的对象
        actionList = val[1]; //应用在对象上的操作
        bindMap[target[0]][target[1]] = bindMap[target[0]][target[1]].concat(actionList);
    }
};
sm.prototype.sicp = function(start) {
    let from = start;
    let to = "";
    //这就是传说中的this的问题
    return (arg) => {
        to = this.stateEval(from, arg);
        this.bindEval(arg,from,to);
        return this.sicp(to);
    }
};
sm.prototype.stateEval = function(name, event) {
    let node = this.stateMap[name];
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

sm.prototype.bindEval = function(event,from,to) {
    //要优雅
    for (let fun of this.bindMap["*"]["*"]) {
        fun(event);
    }
    for (let fun of this.bindMap[from]["*"]) {
        fun(event);
    }
    for (let fun of this.bindMap["*"][to]) {
        fun(event);
    }
    for (let fun of this.bindMap[from][to]) {
        fun(event);
    }
}