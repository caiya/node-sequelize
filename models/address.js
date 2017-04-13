/**
 * 用户地址类(用户:地址=1:n)
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("address", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        userId: {
            type: DataTypes.INTEGER,
            field: "user_id",
            comment: "用户id",
            references: { //引用user模型里的id属性，即在loginInfo表中添加user_id逻辑关联
                model: "user",
                key: "id"
            }
        },
        consignee: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "收货地址"
        },
        address: {
            type: DataTypes.STRING(1024),
            allowNull: false,
            comment: "详细地址"
        },
        zipCode: {
            type: DataTypes.STRING(16),
            field: "zip_code",
            allowNull: true,
            comment: "邮编"
        },
        tel: {
            type: DataTypes.STRING(32),
            allowNull: false,
            comment: "电话"
        }
    }, {
        underscored: true, //额外字段以下划线来分割
        timestamps: false, //取消默认生成的createdAt、updatedAt字段
        freezeTableName: true, // Model 对应的表名将与model名相同
        //静态方法，即user模型自带的方法
        classMethods: classMethods,
        // charset: 'utf8',   //手动指定编码
        // collate: 'utf8_general_ci',
        comment: "用户地址表",
        indexes: [{
            name: "address_userId",
            method: "BTREE",
            fields: ["user_id"]
        }]
    });
}

const classMethods = {

}