const express = require("express");
const app = express();
const route = require(__dirname + "/route.js");

app.use("/", route);
//const cors=require("cors");

//to allow cross origin we use middleware
// app.use(cors());

//user define middleware
app.use((req, res, next) => {
    var date = Date.now();
    console.log(date);
    next();
})

app.use((req, res, next) => {
    console.log("hello world", req.url);
    next();
})

app.get("/", (req, res) => {
    res.send("hello world");
})

//route based middleware

app.get("/abc", (req, res, next) => {
    console.log("route based middleware");
    next();
}, (req, res, next) => {
    res.send("abc");
})

function fun(req, res, next) {
    console.log("function based middleware");
    next();
}
//route based middleware through function
app.get("/def", fun, (req, res, next) => {
    res.send("def");
})


//to get data using params 
//dynamic routing
app.get("/name/:name/id/:id", (req, res) => {
    console.log(req.params);
    res.end();
})
app.listen(3000, (err) => {
    if (err)
        console.log(err);
    else
        console.log("server started at port 3000");
})



//routing
//params
