const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

// Routes
const router = require("./Routes/user");
app.use("/", router);

const port = "8080";
app.listen(port, () => {
  console.log(`app listening at ${port}`);
});
