const bcrypt = require("bcrypt");
const Appointment = require("./../Models/appointmentModel");
const errHandler = require("./errorHandeler");

exports.getAllAppointments = (req, res, next) => {
    Appointment.find({})
        .populate({ path: "user" })
        .populate({ path: "clinic" })
        .then(data => {
            if (data == null) throw new Error("we have no Appointment for you yet!")
            res.status(200).json(data)
        })
        .catch(err => next(err))
}

exports.getAppointment = (req, res, next) => {
    Appointment.findOne({ _id: req.params.id })
    .populate({ path: "users" })
    .populate({ path: "clinics" })
        .then(data => {
            if (data == null) throw new Error("We have no Appointment with that id")
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
}

exports.addAppointment = (req, res, next) => {
    errHandler(req)
    
    let newAppointment = new Appointment({
        name: req.body.name,
        user: req.body.user,
        clinics: req.body.clinics,
        date: req.body.date,
    })

    Appointment.findOne({ _id: req.body._id })
        .then(data => {
            if (data !== null) {
                throw new Error("this Appointment already exists")
            } else {
                newAppointment.save()
                    .then(data => {
                        res.status(201).json({ message: "added", data })
                    })
                    .catch(err => next(err))
            }

        })
        .catch(err => next(err))
}


exports.updateAppointment = function (req, res, next) {
	Appointment.updateOne(
		{ _id: req.body.id },
		{
			$set: {
				name: req.body.name,
                user: req.body.user,
                clinic:req.body.clinic,
                date: req.body.date,
			},
		}
	).then(data => {
        if (data == null) throw new Error("Appointment is not found")
        res.status(200).json({ message: "updated", data })
    })
    .catch(err => next(err))
};

exports.deleteAppointment = function (req, res, next) {
	Appointment.findOne({ _id: req.body.id })
		.then((data) => {
			if (data == null) throw new Error("Not Found");
			Appointment.deleteOne({ _id: request.body.id })
				.then((data) => {
					response.status(200).json(data);
				})
				.catch((error) => next(error));
		})
		.catch((error) => next(error));
};

// appointmentReport
exports.getAppointmentReport = (req, res, next) => {
	errorHandeler(req);

    Appointment.find({})
    .populate("doctors")
    .populate("patient")
    .populate("clinic")
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((e) => {
			res.status(500).send(e);
		});
};
