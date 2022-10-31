const express = require("express");
const routes = require("./src/routes/task.router");
const app = express();
const cors = require("cors");
require("./src/infra");

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(4000);
