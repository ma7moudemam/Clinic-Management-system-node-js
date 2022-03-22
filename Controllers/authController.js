const errHandler = require("./errorHandeler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Clinic = require("./../Models/ClinicModel");

//admin data 
const adminEmail = "admin@cms.com";
const adminPassword = "000";

exports.login = (req, res, next) => {
    errHandler(req);
    const body = req.body;
    if (body.email === adminEmail && body.password === adminPassword) {
        console.log("welcome admin");
        let token = jwt.sign({
            email: body.email,
            role: "admin"
        }, process.env.secret_key)
        res.status(200).json({ data: "you r in", body: req.email, token })
    } else {
        Clinic.findOne({ email: body.email })
            .then(data => {
                if (data !== null) {
                    const validPassword = bcrypt.compareSync(body.password, data.password);
                    if (validPassword) {
                        console.log("welcome ya nurse")
                        let token = jwt.sign({
                            email: body.email,
                            role: "clinic",
                            id: data._id
                        }, process.env.secret_key, { expiresIn: "1h" });
                        res.status(200).json({ data: "you r in", body: req.email, token })
                    }
                }
            })
    }
}

exports.registerUser = (req, res, next) => {
    errHandler(req);
    if (req.body.role === "doctor") {
        // add to doctor
        //res.redirect(307, "/doctors")
    }
    if (req.body.role === "clinic") {
        // add to clinic
        res.redirect(307, "/clinics")
    }
    if (req.body.role === "user") {
        // add to patients 
        // res.redirect(307,"/patients")
    }
    if (req.body.role === "employee") {
        //res.redirect(307,"/employees")
    }
}