const express = require("express");
const router = express.Router();
const invoiceController = require("./../Controllers/invoiceController");

router.post("/", invoiceController.createInvoice);
router.get("/", invoiceController.getInvoice); 
router.patch("/", invoiceController.updateInvoice);
router.delete("/", invoiceController.deleteInvoice); 



module.exports = router;
