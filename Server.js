const bodyParser = require('body-parser');
const express = require('express')
const { engine } = require('express-handlebars');
const hbs_helper = require('./app/config/hbs.helper');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const db = require('./app/models/index');
const config = require('./app/config/app');
const app = express();
const route = require('./app/routes/index.router');

// Cài đặt handlebars engine
app.engine('hbs', engine({ extname: '.hbs',helpers:hbs_helper }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app/views'));

// Thiết lập đường dẫn tĩnh
app.use('/public', express.static(path.join(__dirname, 'app/public')));
app.use('/uploads', express.static(path.join(__dirname, 'app/uploads')));
// Cài đặt bodyParser và cookieParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Cài đặt express-session
app.use(session({
    secret:config.session.secret,
    resave:true,
    saveUninitialized:true
}));

//setup routes
route(app);

//Khởi tạo server
app.listen(config.port, (err) => {
    if (err) throw err;
    console.log(`✔ ${config.app.title} running on port ${config.port}...`);
})