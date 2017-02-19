function test(real, except) {
    const a = JSON.stringify(real);
    const b = JSON.stringify(except);
    return a === b;
}

function testcases(fun, cases) {
    sucessCounter = 0
    for (var i in cases) {
        if (test(fun(cases[i].arg), cases[i].res)) {
            sucessCounter++;
        } else {
            console.log("test case %d fail", i);
        }
    }
    console.log("%s test case %d/%d ok", fun.name, sucessCounter, cases.length);
}