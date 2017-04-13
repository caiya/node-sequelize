var express = require('express');
var router = express.Router();

var { sequelize, Sequelize } = require("../config/db");

var User = sequelize.import("../models/user");
var LoginInfo = sequelize.import("../models/loginInfo");

/**
 * 获取所有地址（包括用户信息，不包括用户的话去掉include即可）
 */
router.get("/", function(req, res, next) {
    LoginInfo.findAll({
        include: [{
            model: User
        }]
    }).then(function(loginInfos) {
        res.json({
            status: 1,
            data: loginInfos
        });
    }).catch(next);
});

/**
 * 获取当前登录信息关联的用户信息
 */
router.get("/:id/user", function(req, res, next) {
    LoginInfo.findOne({
        where: {
            id: req.params.id
        },
        include: [User]
    }).then(function(loginInfo) {
        res.json({
            status: 1,
            data: loginInfo
        });
    }).catch(next);
});

/**
 * 删除
 */
router.get("/:id/del", function(req, res, next) {
    LoginInfo.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next);
});

module.exports = router;