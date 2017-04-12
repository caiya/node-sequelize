var express = require('express');
var router = express.Router();

var { sequelize } = require("../config/db");

var User = sequelize.import("../models/user");
var Address = sequelize.import("../models/address");

/**
 * 获取单个用户
 */
router.get('/:id', function(req, res, next) {
    User.getUserById(req.params.id).then(function(result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next);
});

/**
 * 获取所有用户
 */
router.get('/', function(req, res, next) {
    User.getUsers().then(function(result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next);
});

/**
 * 新增
 */
router.post('/', function(req, res, next) {
    var user = User.build(req.body);
    user.save().then(function(result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next);
});

/**
 * 修改
 */
router.post('/:id/update', function(req, res, next) {
    User.updateUserById(req.body, req.params.id).then(function(result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next);
});

/**
 * 删除
 */
router.get('/:id/del', function(req, res, next) {
    User.deleteById(req.params.id).then(function(result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next);
});

/**
 * 查找某个用户的所有地址
 */
router.get("/:id/addresses", function(req, res, next) {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(user) {
        return user.getAddresses();
    }).then(function(addresses) {
        res.json({
            status: 1,
            data: addresses
        });
    }).catch(next);
});

module.exports = router;