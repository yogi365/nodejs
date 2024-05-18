const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
    if (req.url == "/home" || req.url == "/") {
        fs.readFile(__dirname+"/home.html", "utf-8", (err, data) => {
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
    else if (req.url == "/index.js") {
        fs.readFile(__dirname+"/index.js", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(302, { 'Content-Type': 'text/plain' })
                res.write("not");
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.write(data);
            }
            res.end();
        })
    }
    else if (req.url == "/abc.jpg") {
        fs.readFile(__dirname+"/image.jpg",  (err, data) => {
            if (err) {
                res.write("not");
            }
            else {
                res.write(data);
            }
            res.end();
        })
    }  //for these broken image come if you want to see image please download and put into http folder with name image.jpg
   else if (req.url == "/style.css") {
        fs.readFile(__dirname+"/style.css", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(302, { 'Content-Type': 'text/plain' })
                res.write("not");
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/css' })
                res.write(data);
            }
            res.end();
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

//similarly handle for /about and / contact and navbar