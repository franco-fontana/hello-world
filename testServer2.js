const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/tours", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    mongoose.connection.useDb("tours");
    mongoose.connection
      .collection("tours")
      .insertOne({
        name: "Inserting",
        date: new Date(),
      })
      .then(() => process.exit(0));
  });
