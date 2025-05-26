const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.CheckUser = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, "Nikhil", async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                    next();
                } else {
                    try {
                        const user = await UserModel.findById(decodedToken.id);
                        if (user) {
                            res.json({ status: true, user: user.name });
                        } else {
                            res.json({ status: false });
                            next();
                        }
                    } catch (dbError) {
                        console.error("Database error:", dbError);
                        res.status(500).json({ status: false, message: "Database error" });
                    }
                }
            });
        } else {
            res.json({ status: false });
        }
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ status: false, message: "Server error" });
    }
};
