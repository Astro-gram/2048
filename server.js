const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");

server.listen(3000, () => {
    console.log("Listen on http://localhost:3000");
})

app.use(express.static('public'));

const options = {
    root: path.join(__dirname, "./public/html")
}

app.get("/", (req, res) => {
    res.status(200).sendFile("index.html", options);
})