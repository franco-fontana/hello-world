const mongoose = require("mongoose");
const http = require("http");

//const hostname = "127.0.0.1"; // for local tests
const hostname = "0.0.0.0";
// const port = 3000; // for local tests
const port = 8080;
var connOK = false;

const server = http.createServer((req, res) => {
  if (req.url != "/favicon.ico") {
    res.setHeader("Content-Type", "text/plain");

    mongoose
      .connect("mongodb://mongodbhello:27017/tours", {
        // for local tests
        //.connect("mongodb://127.0.0.1:27017/tours", {
        auth: { authSource: "admin" },
        user: "admin",
        pass: "123456",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((err) => {
        console.log(
          "*** CONNECTION ERROR MONGODB: " + err.reason + " *** " + err
        );
        process.exit(1);
      })
      .then(() => {
        connOK = true;
      });
    //  console.log(req.url);
    if (!connOK) {
      res.end("Not ready yet !!!");
    } else {
      mongoose.connection
        .useDb("tours")
        .collection("tours")
        .insertOne({
          name: "Inserting",
          date: new Date(),
        })
        .catch((err) => {
          console.log(
            "*** INSERT ERROR TO MONGODB: " + err.reason + " *** " + err
          );
          process.exit(1);
        });
      console.log("Record Inserted . . .");
      res.statusCode = 200;
      res.end("Hello World!!!! " + "***** DB connection successful !!!");
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
