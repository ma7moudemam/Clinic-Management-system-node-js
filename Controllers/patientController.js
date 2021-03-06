const errorHandeler = require("./errorHandeler.js");
const PatientModel = require("./../Models/patientModel");

exports.createPatient = (req, res, next) => {
	errorHandeler(req);

    let object = new PatientModel({
		name: req.body.name,
		gender: req.body.gender,
        age: req.body.age,
		location: {
			governorate: req.body.governorate
		},
		invoice_id: req.body.invoice_id
	});
	object
		.save()
		.then((data) => res.status(200).json({ data }))
		.catch((error) => next(error));
};

exports.getPatientProfile = (req, res, next) => {
	errorHandeler(req);
    if(! req.body._id){
        PatientModel.find({}).populate("invoice_id")
		.then((users) => {
			res.status(200).send(users);
		})
		.catch((e) => {
			// console.log(e)
			res.status(500).send(e);
		});
    } else{
		PatientModel.findById(req.body._id).populate("invoice_id")
		.then((users) => {
			res.status(200).send(users);
		})
		.catch((e) => {
			console.log(e)
			res.status(500).send(e);
		});
    }
};

exports.updatePatientProfile = (req, res, next) => {
	errorHandeler(req);

    const updates = Object.keys(req.body);
	const allwoedUpdates = ["_id", "name", "gender", "age", "governorate"];
	const isValidOperation = updates.every((update) => allwoedUpdates.includes(update));
	if (!isValidOperation) {
		return res.status(400).send("error: Invalid updates!");
	}

	PatientModel.findById(req.body._id)
		.then((user) => {
			if (!user) {
				throw new Error("User Not Found");
			}
			updates.forEach((update) => {
				user[update] = req.body[update];
			});

			return user.save();
		})
		.then((data) => {
			res.status(201).send({ data });
		})
		.catch((e) => {
			res.status(500).send(e);
		});
};

exports.deletePatient = (req, res, next) => {
	errorHandeler(req);
    PatientModel.findByIdAndDelete(req.body._id)
		.then((user) => {
			if (!user) {
				return res.status(404).send("User not found");
			}
			res.status(302).send(user);
		})
		.catch((e) => {
			res.status(500).send(e);
		});
};

exports.filterPatients = (req, res, next) => {
	errorHandeler(req);
    PatientModel.find({"location.governorate":req.body.governorate})
		.then((user) => {
			if (!user) {
				return res.status(404).send("User not found");
			}
			res.status(302).send(user);
		})
		.catch((e) => {
			res.status(500).send(e);
		});
};

exports.sortPatients = (req, res, next) => {
	errorHandeler(req);

    PatientModel.find({}).sort({ name : 1})
    .then((user) => {
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(302).send(user);
    })
    .catch((e) => {
        res.status(500).send(e);
    });
};

// male&female chart
exports.getStatistic = async (req, res, next) => {
    errorHandeler(req);

    try {
        const maleToFemale = await PatientModel.statistic()
        res.status(201).send(maleToFemale)
        
    } catch (e) {
     res.status(400).send(e)   
    }
}
