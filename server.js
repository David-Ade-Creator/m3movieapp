const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./src/config");
const authRoute = require("./src/routes/authRoute");
const movieRoute = require("./src/routes/movieRoute");

const app = express();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(
    mongodbUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    console.log("connected")
  )
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());
app.use("/api/m3/", authRoute);
app.use("/api/m3/", movieRoute);

app.listen(config.PORT, () => {
  console.log(`server started at ${config.PORT}`);
});
