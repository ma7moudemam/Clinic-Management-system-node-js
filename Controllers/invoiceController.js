const errorHandeler = require("./errorHandeler.js");
const InvoiceModel = require("./../Models/invoiceModel");
const PatientModel = require("./../Models/patientModel")

exports.createInvoice = (req, res, next) => {
	errorHandeler(req);
	let i=0;
	let idArray =[]
	PatientModel.find({}).then((data) => {
		while(i < data.length){
			idArray.push(data[i]["_id"]) 
			i++
		}
		if(! idArray.includes(req.body._id)){
			let object = new InvoiceModel({
				price: req.body.price,
				payment: req.body.payment,
				patient_id : req.body.patient_id
			});
			object
				.save()
				.then((data) =>
					res.status(200).json({ data }))
				.catch((e) => {
					res.status(500).send(e);
				})
		} else {
			// push new invoice to exist one
			// console.log(data)
			PatientModel.findById(req.body.patient_id).then((data) => {
				data["invoice_id"].push({
					price: req.body.price,
					payment: req.body.payment,
				})
				res.status(200).json({ data })
			}).catch((e)=>{
				console.log(e)
				res.status(500).send(e);
			})
		}
		
	})
	// .catch((e) => {
	// 	res.status(500).send(e);
	// });

	// if(PatientModel._id != req.body.patient_id){
	// 	let object = new InvoiceModel({
	// 	price: req.body.price,
	// 	payment: req.body.payment,
    //     patient_id : req.body.patient_id
	// });
	// object
	// 	.save()
	// 	.then((data) =>
	// 		res.status(200).json({ data }),
	// 		)
	// 	.catch((error) => next(error));
	// }else {

	// }
    
};

exports.getInvoice = (req, res, next) => {
	errorHandeler(req);
    InvoiceModel.find({}).populate("patient_id")
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((e) => {
			res.status(500).send(e);
		});
};

exports.updateInvoice = (req, res, next) => {
	errorHandeler(req);

	const updates = Object.keys(req.body);
	const allwoedUpdates = ["_id", "price", "payment"];
	const isValidOperation = updates.every((update) => allwoedUpdates.includes(update));
	if (!isValidOperation) {
		return res.status(400).send("error: Invalid updates!");
	}

	InvoiceModel.findById(req.body._id)
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
			console.log(e)
			res.status(500).send(e);
		});
    
};

exports.deleteInvoice = (req, res, next) => {
	errorHandeler(req);
	InvoiceModel.findByIdAndDelete(req.body._id)
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((e) => {
			res.status(500).send(e);
		});
};

