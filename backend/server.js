require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const songRoutes = require("./routes/songs");
const userRoutes = require("./routes/user");
const bodyParser = require('body-parser');


//express app
const app = express();

/*const cors = require('cors')
 
app.use(cors()) */

//middleware
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))

const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));

app.use((req, res, next) => {
  next();
});

//routes
app.use("/api/songs", songRoutes);

app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT || 4000, () => {
      console.log("connected to db & listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
