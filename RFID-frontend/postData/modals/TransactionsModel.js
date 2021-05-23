const mongoose = require('mongoose')

const transactionsSchema=new mongoose.Schema({

    UUI_ID:{
        type:String,
        required:false
    },
    Initial_Balance:{
        type:String,
        required:false
    },
    Transport_fee:{
        type:String,
        required:false
    },
    New_Balance:{
        type:String,
        required:false
    },
    Date_of_Transaction:{
        type:Date,
    }

})
const Transactions=mongoose.model("Transactions",transactionsSchema)
module.exports=Transactions
