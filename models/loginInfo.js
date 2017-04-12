/**
 * 登录信息存储类
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("loginInfo", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        userId: {
            type: DataTypes.INTEGER,
            field: "user_id",
            unique: true,
            references: { //引用user模型里的id属性，即在loginInfo表中添加user_id逻辑关联
                model: "user",
                key: "id"
            }
        },
        loginIp: {
            type: DataTypes.STRING,
            field: "login_ip",
            allowNull: false,
            defaultValue: "",
            validete: { //ip校验
                isIp: true
            },
            comment: "登录ip"
        }
    }, {
        underscored: true, //额外字段以下划线来分割
        timestamps: true, //取消默认生成的createdAt、updatedAt字段
        freezeTableName: true, // Model 对应的表名将与model名相同
        createdAt: "created_at",
        updatedAt: "updated_at",
        //静态方法，即user模型自带的方法
        classMethods: classMethods,
        comment: "用户登录信息",
        indexes: [{
            name: "loginInfo_userId",
            method: "BTREE",
            fields: ["user_id"]
        }]
    });
}

const classMethods = {

}