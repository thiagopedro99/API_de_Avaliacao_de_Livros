
require('dotenv').config(); 
const express = require('express');
const app = express();
const routes = require('./router');






app.use(express.json());

app.use(routes);

app.listen(3000);