var express = require('express');
var router = express.Router();

var { sequelize, Sequelize } = require("../config/db");

var User = sequelize.import("../models/user");
var Address = sequelize.import("../models/address");
var LoginInfo = sequelize.import("../models/loginInfo");

/**
 * 获取地址列表
 */
router.get("/", function(req, res, next) {
    Address.findAll({
        include: [{
            model: User,
            as: "user_id"
        }]
    }).then(function(addresses) {
        res.json({
            status: 1,
            data: addresses
        });
    }).catch(next);
});

module.exports = router;