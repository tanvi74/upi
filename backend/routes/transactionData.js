const router = require('express').Router();
const Transaction = require('../models/Transaction');

router.post('/data', async (req,res)=>{
    console.log(req.body);
    const transaction = new Transaction({
        name: req.body.name,
        username: req.body.username,
        accountNumber: req.body.accountNumber,
        csvData: req.body.json_object                
    });
    try{
        const savedUser = await transaction.save();
        res.json({
            status: "success",
        });
    }catch(err){
        res.send(err);
    }
})
module.exports = router;