// const slugify = require("slugify");
const express = require("express");
const userRouter = require("./routes/user");
const bodyParser = require("body-parser");
// Create Server
const mongoose = require("mongoose");
const keys = require("./config/keys");

//Start mongoDB async
async function main() {
  await mongoose.connect(keys.mongoURI);
  console.log("You successfully connected to MongoDB!");
}
main().catch((err) => console.log(err));

//Create server
//create express app
const app = express();

//use middleware to get body object
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from the server!", app: "Better Dates" });
});

//routes
app.use("/api/v1/user/", userRouter);

//start the server
app.listen(keys.port, () => {
  console.log(`App running on port ${keys.port}...`);
});
