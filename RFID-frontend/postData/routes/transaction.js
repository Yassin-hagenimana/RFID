const express = require('express')
const router=express.Router();
const routes=require("../controllers/transactionControllers")
router.post("/postTransactions",routes.postTransactions)
router.get("/getTransactions",routes.getTransactions)
router.delete("/delete",routes.deleteAll)

module.exports=router