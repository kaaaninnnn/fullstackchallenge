const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(require("./controllers/CarDetailController"));

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
