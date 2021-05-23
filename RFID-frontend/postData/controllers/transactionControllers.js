const Transactions=require("../modals/TransactionsModel")
exports.postTransactions=async(req,res)=>{
    try {
        const published_date = new Date()
        const newTransaction=Transactions({
            UUI_ID:req.body.UUI_ID,
            Initial_Balance:req.body.Initial_Balance,
            Transport_fee:req.body.Transport_fee,
            New_Balance:req.body.New_Balance,
            Date_of_Transaction:published_date
        })
        let transaction= await newTransaction.save()
        res.status(200).json({Transaction:transaction})
    } catch (err) {
        res.status(404).json({Message:err})
        console.log(err)
    }
}

exports.getTransactions=async(req,res)=>{
    Transactions.find()
    .then(transaction=>{
        res.status(201).json({Transactions:transaction})
    })
    .catch(err=>{
        res.status(404).json({Message:err})
    })
}
exports.deleteAll=async(req,res)=>{
    Transactions.deleteMany()
    .then(tr=>{
        res.json({message:tr})
    })
    .catch(err=>{
        res.json({err:err})
    })

}