const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

module.exports = async (req, res, next) => {
    try {
        if (!req.cookies || !req.cookies.token) {
            return res.redirect("/");
        }

        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        if (!decoded || !decoded.email) {
            return res.redirect("/login");
        }

        const user = await User.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            return res.redirect("/");
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.redirect("/");
    }
};
