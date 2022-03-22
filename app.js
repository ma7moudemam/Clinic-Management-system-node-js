const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");

//Routes
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (request, file, callback) => {
		callback(null, path.join(__dirname, "images"));
	},
	filename: (req, file, callback) => {
		callback(null, new Date().toLocaleDateString().replace(/\//g, "-") + "-" + file.originalname);
	},
});
const limits = { fileSize: 838861 };
const fileFilter = (request, file, callback) => {
	if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png")
		callback(null, true);
};
const clinicRoute = require("./Routers/clinicRoute")
const prescriptionRoute = require("./Routers/prescriptionRoute");
const userRoute = require("./Routers/userRouter");
const app = express();
mongoose.connect("mongodb://localhost:27017/CMS")
    .then(() => {
        console.log("DB connected ....")

        app.listen(8080, () => {
            console.log("listening...")
        })
    }).catch(err => {
        console.log("DB Problem", err)
    })

// Middlewares
app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization")
    next();
});
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }))
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage, limits, fileFilter }).array("image"));
// Routing
app.use(userRoute)
app.use(clinicRoute)
app.use(prescriptionRoute)
// errors Middleware
app.use((req, res) => {
    res.status(404).json({ data: "Page Not Found" });
});

app.use((error, req, res, next) => {
    let status = error.status || 500;
    res.status(status).json({ Error: error + "" })
})