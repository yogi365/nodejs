const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const server = http.createServer((req, res) => {
    const urlparsed = url.parse(req.url, true);
    if (req.url == "/") {
        fs.readFile(path.join(__dirname, "home.html"), "utf-8", (err, data) => {
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
    else if (req.url == "/submit") {
        res.write(JSON.stringify({ name: "abc" }));
        res.end();
    }
    else if (urlparsed.pathname == "/add" && req.method == "GET") {
        console.log(urlparsed.query);
        res.write("done");
        res.end();
    }
    else if (req.url == "/add" && req.method == "POST") {
        let responseData = "";
        req.on('data', (chunk) => {
            responseData += chunk;
        });

        req.on('end', () => {
            console.log(JSON.parse(responseData));
            res.end("post done");
        })
    }
});
server.listen(3000, (err) => {
    if (err)
        console.log(err)
    else
        console.log("server is runnning at 3000");
})