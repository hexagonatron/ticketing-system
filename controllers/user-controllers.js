//NPM Dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

//Local dependancies
const db = require("../models");
const { getUserBalance, getUserById } = require('./helpers/user-helpers');

//Loading private key from env variables
const privateKey = process.env.JWT_PRIV_KEY;

//Validate password function returns false if password not valid
const validatePassword = (password) => {
    const upper = /[A-Z]+/.test(password);
    const lower = /[a-z]+/.test(password);
    const num = /[0-9]+/.test(password);

    return password.length >= 8 && upper && lower && num;
}

//Returns false if email not a valid format
const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return emailRegex.test(email);
}

//Returns false if passwords don't match
const comparePasswords = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) return reject(err);

            return resolve(result);
        })
    })
}

//Issues token
const issueToken = (user) => {
    return jwt.sign(user, privateKey, { expiresIn: process.env.JWT_EXPIRY_TIME });
}

module.exports = {

    //Signup route
    signup(req, res) {
        const { body: { email, password, confirmpassword, first_name, last_name, dob } } = req;

        //Make sure all info included
        if (
            email === undefined ||
            password === undefined ||
            confirmpassword === undefined ||
            first_name === undefined ||
            last_name === undefined ||
            dob === undefined
        ) return res.status(400).json({ error: "Missing information" })

        //Validate dob
        if (!moment(dob, "yyy-MM-DD").isValid()) return res.status(400).json({ error: "DOB not must be in yyy-MM-DD format" });

        //Make sure passwords match
        if (password !== confirmpassword) return res.status(400).json({ error: "Passwords don't match" });

        //Validate email
        if (!validateEmail(email)) return res.status(400).json({ error: "Not a valid email address" });

        //Password requirements
        if (!validatePassword(password)) return res.status(400).json({ error: "Password doesn't meet requirements" });

        db.User.findAll({ where: { email } }).then(async result => {
            if (result.length != 0) return res.status(403).json({ error: "Email already Exists" });

            db.User.create({
                email,
                password,
                first_name,
                last_name,
                dob,
                id: uuidv4()
            }).then(result => {

                const userIdentifier = {
                    id: result.id,
                    email: result.email,
                    role: result.role
                }

                const token = issueToken(userIdentifier);

                userIdentifier.token = token;

                res.status(200).json(userIdentifier);

            }).catch(error => {
                res.status(500).json({ error: "Error signing up" });
            })

        }).catch(error => {
            res.status(500).json({ error: "Error signing up" })
        })


    },


    //Login route
    login(req, res) {

        const { body: { email, password } } = req;

        if (email === undefined || password === undefined) return res.status(400).json({ error: "Missing information" })

        db.User.findOne({ where: { email } }).then(async result => {
            const user = result;

            //If passwords don't match return error
            if (! await comparePasswords(password, user.password)) return res.status(400).json({ error: "Incorrect username or password" });



            const userIdentifier = {
                id: user.id,
                email: user.email,
                role: user.role
            }

            const token = issueToken(userIdentifier);

            userIdentifier.token = token;

            res.status(200).json(userIdentifier);

        }).catch(error => {
            res.status(400).json({ error: "Incorrect username or password" });
        })
    },

    //Get user info route
    getUserInfo(req, res) {

        const id = req.params.id;

        db.User.findOne({ where: { id } }).then(result => {
            const response = {
                id: result.id,
                email: result.email,
                role: result.role,
                first_name: result.first_name,
                last_name: result.last_name,
                dob: result.dob,
                is_event_creator: result.is_event_creator,
                is_event_admin: result.is_event_admin
            }

            res.status(200).json(response);
        }).catch(error => {
            res.status(404).json({ error: "Couldn't find user" })
        })
    },

    getAuthenticatedUser(req, res) {

        //If middlewear didn't add user object to req then return (shouldn't happen)
        if (req.user === undefined) return res.status(401).json({ error: "Authentication error" });

        db.User.findOne({ where: { id: req.user.id } }).then(result => {

            //If values in token don't match the data from database return an error
            if (result.dataValues.id !== req.user.id || result.dataValues.email !== req.user.email) return res.status(404).json({ error: "Could not get details of user" });

            const response = {
                id: result.id,
                email: result.email,
                role: result.role,
                first_name: result.first_name,
                last_name: result.last_name,
                dob: result.dob,
                is_event_creator: result.is_event_creator,
                is_event_admin: result.is_event_admin
            }

            res.status(200).json(response);

        }).catch((error) => {
            return res.status(404).json({ error: "Could not get details of user" });
        })
    },
    getAllUsers(req, res) {
        //If middlewear didn't add user object to req then return (shouldn't happen)
        if (req.user === undefined) return res.status(401).json({ error: "Authentication error" });

        db.User.findAll({ where: {} }).then(result => {
            const response = result.map(user => {
                return {
                    id: result.id,
                    email: result.email,
                    role: result.role,
                    first_name: result.first_name,
                    last_name: result.last_name,
                    dob: result.dob,
                    is_event_creator: result.is_event_creator,
                    is_event_admin: result.is_event_admin
                }
            })

            return res.status(200).json(response);
        }).catch(error => {
            res.status(500).json({ error: "Unable to process request" });
        })


    },
    updatePassword(req, res) {

        //If middlewear didn't add user object to req then return (shouldn't happen)
        if (req.user === undefined) return res.status(401).json({ error: "Authentication error" });

        const { body: { oldPassword, newPassword, confirmPassword } } = req;

        if (oldPassword === undefined || newPassword === undefined || confirmPassword === undefined) return res.status(400).json({ error: "Missing information" })

        db.User.findOne({ where: { id: req.user.id } }).then(async user => {

            if (! await comparePasswords(oldPassword, user.password)) return res.status(400).json({ error: "Incorrect password" });

            if (newPassword !== confirmPassword) return res.status(400).json({ error: "Passwords don't match" });

            if (!validatePassword(newPassword)) return res.status(400).json({ error: "New password doesn't meet requirements" });

            user.password = newPassword;

            user.save().then(result => {
                return res.status(200).json({ success: "Password changed succesfully" });
            })

        }).catch(error => {
            res.status(500).json({ error: "Error while trying to change password" })
        })

    },
    makeEventCreator(req,res) {
        if (req.user === undefined) return res.status(401).json({ error: "Authentication error" });

        //Admin user can make anyone admin
        if(req.user.role == "admin" && req.query.id){
            return db.User.findOne({ where: { id: req.query.id } }).then(async user => {

                user.is_event_creator = true;
    
                return user.save().then(result => {
                    return res.status(200).json({ success: `${user.email} is now an event creator` });
                })
    
            }).catch(error => {
                return res.status(500).json({ error: "Error while trying to make event creator" })
            })    
        }

        return db.User.findOne({ where: { id: req.user.id } }).then(async user => {

            user.is_event_creator = true;

            user.save().then(result => {
                return res.status(200).json({ success: "You are now an event creator" });
            })

        }).catch(error => {
            return res.status(500).json({ error: "Error while trying to make event creator" })
        })
    }
}