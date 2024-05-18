const http = require("http");
const fs = require("fs");
const url = require("url");
const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
    let urlparsed = url.parse(req.url, true);
    if (req.url == "/login" || req.url == "/") {
        fs.readFile(__dirname + "/login.html", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(302, { 'Content-Type': 'text/plain' })
                res.write("not");
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data);
            }
            res.end();
        })
    }
    else if (req.url == "/signup" || req.url == "/") {
        fs.readFile(__dirname + "/signup.html", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(302, { 'Content-Type': 'text/plain' })
                res.write("not");
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(data);
            }
            res.end();
        })
    }
    else if (urlparsed.pathname == "/check") {
        console.log(urlparsed.query);
        fs.readFile(__dirname + "/user.json", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(302, { 'Content-Type': 'text/plain' })
                res.write("not");
                res.end();
            }
            else {
                data = JSON.parse(data);
                if (data.length == 0) {
                    data = [];
                }
                let flag = false;
                data.forEach(element => {
                    if (element.username == urlparsed.query.username && element.password == urlparsed.query.password) {
                        flag = true;
                    }
                });
                if (flag)
                    res.write("user exist");
                else {
                    res.write("not exist");
                }
                res.end();
            }
        })
    }
    else if (urlparsed.pathname == "/add") {
        console.log(urlparsed.query);
        fs.readFile(__dirname + "/user.json", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(302, { 'Content-Type': 'text/plain' })
                res.write("not");
            }
            else {
                data = JSON.parse(data);
                if (data.length == 0) {
                    data = [];
                }
                let flag = false;
                data.forEach(element => {
                    if (element.username == urlparsed.query.username && element.password == urlparsed.query.password) {
                        flag = true;
                    }
                });
                if (flag) {
                    res.writeHead(200, { 'Content-Type': 'text/plain' })
                    res.write("already exist");
                    res.end();
                }
                else {
                    data.push(urlparsed.query);
                    fs.writeFile(__dirname + "/user.json", JSON.stringify(data), (err) => {
                        if (err) {
                            res.writeHead(302, { 'Content-Type': 'text/plain' })
                            res.write("error");
                        }
                        else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' })
                            res.write("user created succ");
                        }
                        res.end();
                    })
                }
            }
        })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write("Page not found");
        res.end();
    }
});
server.listen(3000, (err) => {
    if (err)
        console.log(err)
    else
        console.log("server is runnning at 3000");
})

//now complete the logic delete by your own