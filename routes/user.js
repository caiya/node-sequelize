// 将设置放入此文件中以覆盖默认设置
{
    "editor.fontSize": 17,
    "workbench.iconTheme": "vscode-icons",
    "editor.fontFamily": "Source Code Pro, 'Courier New', monospace",
    "git.confirmSync": false
}
ar Address = sequelize.import("../models/address");
var LoginInfo = sequelize.import("../models/loginInfo");

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
    User.getUsers({
        limit: parseInt(req.query.limit) || 10, //默认查询10条
        offset: parseInt(req.query.offset) || 0 //默认查询第一页
    }).then(function(result) {
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
    var user = User.build({
        id: req.params.id
    });
    user.getAddresses({
        // limit: 1,
        // offset: 1
        order: "id desc" //按照id倒排
    }).then(function(addresses) {
        res.json({
            status: 1,
            data: addresses
        });
    }).catch(next);
});

/**
 * 查询某个用户的登录信息（测试提交）
 */
router.get("/:id/logininfo", function(req, res, next) {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [LoginInfo]
    }).then(function(user) {
        res.json({
            status: 1,
            data: user
        });
    }).catch(next);
});

module.exports = router;