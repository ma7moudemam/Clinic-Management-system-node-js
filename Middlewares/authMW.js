const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token, decode;
    try {
        token = req.get("Authorization").split(" ")[1];
        decode = jwt.verify(token, process.env.secret_key || "secret")
    } catch (err) {
        err.message = "you r not authorized..!";
        err.status = 403;
        next(err)
    }
    if (decode !== undefined) {
        req.role = decode.role;
        req.email = decode.email;
        req.id = decode.id
        next()
    }
}