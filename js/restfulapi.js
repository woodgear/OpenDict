function get(url) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                resolve(xhttp.responseText)
            } else if (xhttp.status == 404) {
                reject()
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    })
}

function post(url, data) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                resolve(JSON.parse(xhttp.response))
            }
        };
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json')
        xhttp.send(JSON.stringify(data));
    })
}

function getExplain(word) {
    return get(`http://misakimei.com:9527/api/dict/${word}`)
}

function setknow(id, word) {
    return post(`http://misakimei.com:9527/api/knowWord/${id}`, word)
}

function setunknow(id, word) {
    return post(`http://misakimei.com:9527/api/unknowWord/${id}`, word)
}


function getNewWord(id, word) {
    return post(`http://misakimei.com:9527/api/filterNewWord/${id}`, word)
}