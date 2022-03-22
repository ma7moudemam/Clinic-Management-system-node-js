const User = require("../Models/userModel")
const errHandler = require("./errorHandeler");


const fs = require("fs");
const path = require("path");


exports.getAllUsers = (req, res, next) => {
    errHandler(req)

	User.find({})
        .then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => next(err));
};

exports.getUserByRole = (req, res) => {
    errHandler(req)

    User.find({ role: req.params.id })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            next(error);
        })
}

exports.updateUser = (req,res, next) => {
    errHandler(req)

    User.findByIdAndUpdate(req.body.id, {
        
            $set: {
                userName: req.body.userName,
                email: req.body.email,
                hourRate: req.body.hourRate,
                phoneNumber:req.body.phoneNumber,
                password:req.body.password,
                image:req.file.filename,
                speciality:req.body.password,
            }
        })
        .then(data => {
            if (data == null) throw new Error("User is not Find");
           res.status(200).json({ message: "Updated" }, data);
        })
        .catch(err => next(err))
}

exports.deleteUser = (req,res, next) => {
    errHandler(req)

    User.findByIdAndDelete(req.body.id)
        .then(data => {
            if (data == null) throw new Error("User is not Found");
            fs.unlinkSync(path.join(__dirname, "..//images//") + data.image);
           res.status(200).json({ message: "Deleted" })

        })
        .catch(err => next(err))
}