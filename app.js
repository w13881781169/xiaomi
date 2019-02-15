var express = require('express');
var ejs = require('ejs');
var productsroute = require('./routes/indexroute');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var createError = require('http-errors');
var app = express();
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('views', 'views'); // 模板所在的目录为view
app.use(express.static('public')); // 静态资源所在目录
app.use(bodyparser.json()); // 解析json类型数据
app.use(bodyparser.urlencoded({
    extended: false,
})); // expanded:false表示解析值类型是string|Array, true表示解析值是任意类型
app.use(cookieparser());
app.use(session({ // //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    name: 'web1802',
    secret: 'login',
    cookie: ({
        maxAge: 1000 * 60 * 60 * 24,
    }

    ),
    // 重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    resave: true,
    // 强制“未初始化”的会话保存到存储。
    saveUninitialized: true,
}));
app.use(flash());
app.use('/', productsroute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404)); // 创建404资源找不到错误,next方法交给error handler处理
});


// error handler; 处理所有错误
app.use(function (err, req, res, next) {
    console.log('err :' + err + '  err.status :' + err.status);
    res.status(err.status || 500); // 响应状态码如果没有响应500

    // 判断状态码显示404错误页面
    if (err.status === 404) {
        res.render('error/err404');
    } else {
        res.render('error/error', {
            message: err.message,
            error: {
                status: err.status,
                stack: err.stack,
            },
        });
    }
});
// =========================3.启动web服务=====================================
app.listen(8081, function () {
    console.log('启动服务器，监听8081端口');
});
