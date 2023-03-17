const bodyParser = require('body-parser');
const express = require('express')
const { engine } = require('express-handlebars');
const path = require('path');
const db = require('./src/models/Index');
const config = require('./src/config/AppConfig');
const app = express();
const route = require('./src/routes/IndexRouter');
//setup template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src\\views'));

//setup static path
app.use('/public', express.static(path.join(__dirname, 'src/public')));

// For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setup routes
route(app);

app.listen(config.port, (err) => {
    if (err) throw err;
    console.log(`✔ ${config.app.title} running on port ${config.port}...`);
})