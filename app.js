const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

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
const clinicRoute = require("./Routers/clinicRoute");
const appointmentRoute = require("./Routers/appointmentRouter");
const prescriptionRoute = require("./Routers/prescriptionRoute");
const userRoute = require("./Routers/userRouter");
const authRoute = require("./Routers/authRouter");
const medicineRoute = require("./Routers/medicineRouter");
const patientRouter = require("./Routers/patientRouter");
const invoiceRouter = require("./Routers/invoiceRouter");


const app = express();
mongoose
	.connect("mongodb://localhost:27017/CMS")
	.then(() => {
		console.log("DB connected ....");

		app.listen(8080, () => {
			console.log("listening...");
		});
	})
	.catch((err) => {
		console.log("DB Problem", err);
	});

// Middlewares
app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});
app.use(cors());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	next();
});
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage, limits, fileFilter }).single("image"));
// Routing
app.use(authRoute);
app.use(userRoute);
app.use(clinicRoute);
app.use(prescriptionRoute);
app.use(medicineRoute);
app.use(appointmentRoute);
app.use("/patient", patientRouter);
app.use("/invoice", invoiceRouter);
// errors Middleware
app.use((req, res) => {
	res.status(404).json({ data: "Page Not Found" });
});

app.use((error, req, res, next) => {
	let status = error.status || 500;
	res.status(status).json({ Error: error + "" });
});
