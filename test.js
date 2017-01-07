function test(name, args, except, then = function(name, v) {
    v ? console.log(name + " test ok") : console.assert(false, name + " test fail");
}) {
    let f = this[name];
    let res = f.apply(this, [].concat(args));
    let v = JSON.stringify(res.sort()) === JSON.stringify(except.sort());
    if (then) {
        then(name, v);
    }
    return v;
}

function runtestcases(cases) {
    sucessCounter = 0
    for (var item of cases) {
        if (test(item[0], item[1], item[2])) {
            sucessCounter++
        }
    }
    console.log("test case [%d/%d] ok", sucessCounter, cases.length);

}

testcases = [
    ["parseWords", "died and ", [{
        "start": 0,
        "end": 4,
        "val": "died"
    }, {
        "start": 5,
        "end": 8,
        "val": "and"
    }]],
  ]
runtestcases(testcases)
