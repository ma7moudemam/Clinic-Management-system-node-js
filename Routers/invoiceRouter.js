const express = require("express");
const router = express.Router();
const invoiceController = require("./../Controllers/invoiceController");

router.post("/", invoiceController.createInvoice);
router.get("/", invoiceController.getInvoice); 
router.patch("/", invoiceController.updateInvoice);
router.delete("/", invoiceController.deleteInvoice); 

router.get("/income", invoiceController.getTotleIncome); 
router.get("/patient", invoiceController.getPatientInvoice); 


module.exports = router;
