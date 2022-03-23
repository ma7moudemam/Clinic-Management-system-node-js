const Medicine = require("./../Models/medicineModel");
const errorHandeler = require("./errorHandeler");

exports.deleteMedicine = function (request, response, next) {
	Medicine.findOne({ _id: request.body.id })
		.then((data) => {
			if (data == null) throw new Error("Not Found");
			Medicine.deleteOne({ name: request.body.name })
				.then((data) => {
					response.status(200).json(data);
				})
				.catch((error) => next(error));
		})
		.catch((error) => next(error));
};

exports.updateMedicine = function (request, response, next) {
	Medicine.updateOne(
		{ _id: request.body.id },
		{
			$set: {
				quantity: request.body.quantity,
			},
		}
	);
};

exports.getMedicine = function (request, response, next) {
	if (request.body.name) {
		Medicine.findOne({ name: request.body.name })
			.then((data) => {
				if (data == null) throw new Error("Doesn't exist");
				response.status(200).json(data);
			})
			.catch((error) => next(error));
	} else {
		Medicine.find({})
			.then((data) => {
				response.status(200).json(data);
			})
			.catch((error) => next(error));
	}
};

exports.addMedicine = function (request, response, next) {
	errorHandeler(request);
	Medicine.findOne({ name: request.body.name })
		.then((data) => {
			if (data == null) {
				let object = new Medicine({
					name: request.body.name,
					exp_date: request.body.exp_date,
					quantity: request.body.quantity,
				});
				object
					.save()
					.then((data) => {
						response.status(200).json(data);
					})
					.catch((error) => next(error));
			} else {
				throw new Error("Already Exists");
			}
		})
		.catch((error) => next(error));
};
