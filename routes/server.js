const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", (req, res) => {
    res.cookie("greeting", "helo or batao");
    res.send("helo");
});

app.get("/name", (req,res)=>{
    let {name="jain"}= req.cookies;
    res.send(`"hi ",${name}`)
})

app.get("/ankur", (req, res) => {
    console.dir(req.cookies);
    res.send("kasie ho aap");
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});