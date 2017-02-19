function test_lex() {
    cases = [{
            "arg": "<div>  apple </div> ",
            "res": [new token("apple")]
        },
        {
            "arg": "<div>  apple SFD<p>      测试数据 目标为the World  </p>  <p>    ga de fry try. and it's while die  </p>  <p>  </p>  </div>",
            "res": [new token('apple'),
                new token('SFD'),
                new token('the'),
                new token('World'),
                new token('ga'),
                new token('de'),
                new token('fry'),
                new token('try'),
                new token('and'),
                new token("it's"),
                new token('while'),
                new token('die'),
            ]
        },
    ]
    cases.map((item) => {
        dom = document.createElement('div');
        dom.innerHTML = item.arg;
        item.arg = dom;
        return item;
    });
    testcases(lex, cases)
}

test_lex()