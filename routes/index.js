module.exports = function(app) {
    app.use("/api/users", require("./user.js"));
    app.use("/api/addresses", require("./address.js"));
    app.use("/api/loginInfos", require("./loginInfo.js"));
};