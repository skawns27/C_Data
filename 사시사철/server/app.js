const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const { sequelize } = require('./models');
const dotenv = require('dotenv');
const weatherService = require('./router');

const app = express();
dotenv.config();
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded( {extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie'
}));

sequelize.sync({ force: false}).then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch((err) => {
    console.log(err);
});

app.post('/',  async (req, res) => {
    return weatherService.main(req.body.userData , res);
});

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, ()=> {
    console.log('Server is Running');
});
