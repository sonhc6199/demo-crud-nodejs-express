const express = require('express');
const app = express();
const path = require('path');
// env
require('dotenv').config({ path: __dirname + '/../.env' })

//cors
const cors = require('cors');
app.use(cors({
    origin: ["http://localhost:8080"],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// request data
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

// static url
app.use(express.static(path.join(__dirname, 'public')));

// handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs.create({ extname: '.hbs' }).engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// morgan
const morgan = require('morgan');
app.use(morgan('combined'));


//route
const route = require('./routes/index');
route(app);

// database connect
const db = require('../database/');
db.connect();

app.listen(process.env.APP_PORT, () => {
    console.log(`server web running on *:${process.env.APP_PORT}`);
});


