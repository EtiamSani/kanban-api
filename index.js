const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const router = require('./app/router');
//

//
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static(path.join(__dirname, './assets')));

// Nos Routes
app.use(router);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});