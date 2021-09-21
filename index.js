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

// app.use((req, res, next) => {
//   //allow access from every, elminate CORS
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.removeHeader("x-powered-by");
//   //set the allowed HTTP methods to be requested
//   res.setHeader("Access-Control-Allow-Methods", "POST");
//   //headers clients can use in their requests
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   //allow request to continue and be handled by routes
//   next();
// });
app.use(express.json());
app.use(cors());
app.use("/api/m3/", authRoute);
app.use("/api/m3/", movieRoute);

app.listen(config.PORT, () => {
  console.log(`server started at ${config.PORT}`);
});
