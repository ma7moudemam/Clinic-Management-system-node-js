const bcrypt = require("bcrypt");
const Clinic = require("./../Models/ClinicModel");
const errHandler = require("./errorHandeler");

exports.getAllClinics = (req, res, next) => {
	Clinic.find({})
		.populate({ path: "doctors" })
		.populate({ path: "patients" })
		.populate({ path: "appointments" })
		.populate({ path: "employees" })
		.then((data) => {
			if (data == null) throw new Error("we have no clinics for you yet!");
			res.status(200).json(data);
		})
		.catch((err) => next(err));
};

exports.getClinic = (req, res, next) => {
	Clinic.findOne({ _id: req.params.id })
		.populate({ path: "doctors" })
		.populate({ path: "patients" })
		.populate({ path: "appointments" })
		.populate({ path: "employees" })
		.then((data) => {
			if (data == null) throw new Error("We have no clinics with that id");
			res.status(200).json(data);
		})
		.catch((err) => {
			next(err);
		});
};

exports.addClinic = (req, res, next) => {
	errHandler(req);

	const salt = bcrypt.genSaltSync(10);
	// clinics should be unique by ....
	let newClinic = new Clinic({
		name: req.body.name,
		password: bcrypt.hashSync(req.body.password, salt),
		email: req.body.email,
		doctors: req.body.doctors,
		patients: req.body.patients,
		appointments: req.body.appointment,
		employees: req.body.employees,
		location: req.body.location,
		phone_numbers: req.body.phone_number,
		rooms: req.body.rooms,
		empty_rooms: req.body.empty_rooms,
		image: "http://localhost:8080/images/" + req.file.filename,
	});

	Clinic.findOne({ email: req.body.email })
		.then((data) => {
			if (data !== null) {
				throw new Error("this clinic already exists");
			} else {
				newClinic
					.save()
					.then((data) => {
						res.status(201).json({ message: "added", data });
					})
					.catch((err) => next(err));
			}
		})
		.catch((err) => next(err));
};

exports.updateClinic = (req, res, next) => {
	const salt = bcrypt.genSaltSync(10);
	if (req.role === "clinic") {
		Clinic.updateOne(
			{
				email: req.email,
				phone_number: req.body.old_phone_number,
				location: req.body.old_location,
				appointment: req.body.old_appointment,
				doctors: req.body.old_doctor,
				employees: req.body.old_employee,
			},
			{
				$set: {
					name: req.body.name,
					password: req.body.password ? bcrypt.hashSync(req.body.password, salt) : undefined,
					rooms: req.body.rooms,
					empty_rooms: req.body.empty_rooms,
					"phone_number.$": req.body.new_phone_number,
					"location.$": req.body.new_location,
					"appointments.$": req.body.new_appointment,
					"doctors.$": req.body.new_doctor,
					"employees.$": req.body.new_employee,
				},
			}
		)
			.then((data) => {
				if (data == null) throw new Error("clinic is not found");
				res.status(200).json({ message: "updated", data });
			})
			.catch((err) => next(err));
	}
};

exports.addNewProp = (req, res, next) => {
	if (req.role === "clinic") {
		Clinic.updateOne(
			{ email: req.email },
			{
				$addToSet: {
					// need to update a specefic ref number
					location: req.body.new_location,
					phone_numbers: req.body.new_phone_number,
					appointments: req.body.new_appointment,
					doctors: req.body.new_doctor,
					employees: req.body.new_employee,
				},
			}
		)
			.then((data) => {
				if (data == null) throw new Error("clinic is not found");
				res.status(200).json({ message: "updated", data });
			})
			.catch((err) => next(err));
	}
};

exports.deleteClinic = (req, res, next) => {
	if (req.role === "clinic") {
		if (req.params.id) {
			//update
			Clinic.updateOne(
				{ _id: req.body.id },
				{
					$pull: {
						location: req.params.location,
						phone_numbers: req.params.phone_number,
						appointments: req.params.appointment,
						doctors: req.params.doctor,
						employees: req.params.employee,
					},
				}
			)
				.then((data) => {
					if (data == null) throw new Error("prop id not found");
					res.status(200).json({ message: "prop delted", data });
				})
				.catch((err) => next(err));
		}
		Clinic.deleteOne({ _id: req.body.id })
			.then((data) => {
				if (data == null) throw new Error("clinic is not found");
				res.status(200).json({ message: "deleted" });
			})
			.catch((err) => next(err));
	}
};
