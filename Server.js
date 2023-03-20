const bodyParser = require('body-parser');
const express = require('express')
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const db = require('./src/models/Index');
const config = require('./src/config/AppConfig');
const app = express();
const route = require('./src/routes/IndexRouter');
const flash = require('connect-flash');

// Cài đặt handlebars engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src\\views'));

// Thiết lập đường dẫn tĩnh
app.use('/public', express.static(path.join(__dirname, 'src/public')));

// Cài đặt bodyParser và cookieParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Cài đặt express-session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

// Cài đặt connect-flash để hiển thị thông báo lỗi
app.use(flash());

//setup routes
route(app);

//Khởi tạo server
app.listen(config.port, (err) => {
    if (err) throw err;
    console.log(`✔ ${config.app.title} running on port ${config.port}...`);
})