const mongoose = require("mongoose");
const http = require("http");

//const hostname = "127.0.0.1";
const hostname = "0.0.0.0";
//const port = 3000;
const port = 8080;
let connOK = false;
let connStatus = "";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  mongoose
    .connect("mongodb://172.30.70.75:27017/roc-mongodb", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => (connOK = true));

  if (connOK) {
    connStatus = "DB connection successful!!!";
  } else connStatus = "Connection Error!";

  res.end("Hello World!!!! " + "Montevideo - " + "URUGUAY");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
