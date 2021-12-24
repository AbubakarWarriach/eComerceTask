const express = require("express");
const app = express();
require('dotenv').config();
require('./config/db');
const bodyParser = require('body-parser');
const port = process.env.PORT || 6000;
const route = require('./routes/productRoute');
app.use(bodyParser.json());
app.use('/', route);


app.listen(port, () => {
    console.log("server is runing");
});