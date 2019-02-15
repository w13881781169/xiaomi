var express = require('express');
var query = require('../utils/dbquery');
var productroute = express.Router();
var md5 = require('../utils/md5');
// 主界面
productroute.get('/main', async function (req, res, next) {
    var sql = 'select id,name,produce, newprice, oldprice, img, discount from phonelist where typeid=1 limit 8';
    var data = await query(sql);
    var sql1 = 'select id,name,produce, newprice, oldprice, img, discount from phonelist where typeid=3 limit 4';
    var flashdata = await query(sql1);
    var sql2 = 'select id,name,produce, newprice, oldprice, img, discount from phonelist where typeid=2 limit 4';
    var tvdata = await query(sql2);
    var sql3 = 'select id,name,produce, newprice, oldprice, img, discount from phonelist where typeid=4 limit 3';
    var lifedata = await query(sql3);
    var json = {data: data,
        flashdata: flashdata,
        tvdata: tvdata,
        lifedata: lifedata };
    res.render('index', json);
});
// 登录界面
productroute.get('/login', function (req, res, next) {
    res.render('login');
});
// 登录界面提交
productroute.post('/login', async function (req, res, next) {
    var user = req.body.name;
    var password = req.body.password;
    var autologin = req.body.autologin;
    var psw = md5(password);
    try {
        var sql = 'select id,name,password,headurl from user where name=? and password=?';
        var parmeter = [user, psw];
        var data = await query(sql, parmeter);
        if (data.length === 0) {
            var json = {error: '用户名或者密码出错'};
            res.render('login', json);
        } else {
            if (autologin === 'on') {
                res.cookie('user', {
                    'user': user,
                    'password': password,
                }, {
                    maxAge: 1000 * 60 * 60,
                });
            } else {
                res.clearCookie(user);
            }
            var headurl = data[0].headurl;
            req.session.user = {
                'username': user,
                'headurl': headurl,
            };
            res.redirect('/main');
        }


    } catch (error) {
        next(error);
    }

});
// // 商品详情
productroute.get('/productint', async function (req, res, next) {
    var id = req.query.uid;
    var sql = 'select name,produce,newprice,oldprice,img from phonelist where id=?';
    var parmeter = [id];
    var data = await query(sql, parmeter);
    var json = {data: data[0]};
    res.render('xq', json);
});
module.exports = productroute;
