const jwt = require("jsonwebtoken");
const db = require("../../models");
const privatekey = process.env.JWT_PRIV_KEY;

module.exports = {
    authenticateUser(req, res, next) {

        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, privatekey);
            req.user = decodedToken;
            return next();
        } catch (err) {
            if (err.message === "jwt expired") return res.status(401).json({ error: "Expired token" });

            return res.status(401).json({ error: "Invalid or missing token" });
        }

    },

    checkAdmin(req, res, next) {
        //If middlewear didn't add user object to req then return (shouldn't happen)
        if (req.user === undefined) return res.status(401).json({ error: "Authentication error" });

        //if authed user isn't an admin then don't give them access
        if (req.user.role !== 'admin') return res.status(403).json({ error: "User not permitted" });

        return next()
    },

    checkEventCreator(req, res, next) {
        db.User.findOne({ where: { id: req.user.id } }).then(user => {
            if(user.is_event_creator) return next();

            return res.status(403).json({ error: "Insufficient permissions" })
        }).catch(err => {
            return res.status(500).json({ error: "Error checking event creator" })
        })
    }
}