const express = require("express");
const app = express();
const {User,Accounts} = require('../db')
const router = express.Router();
const {authMiddleware} = require('../middleware');
const { mongoose } = require("mongoose");
const cors = require('cors');
app.use(cors());

router.get("/balance",authMiddleware,async (req,res)=>{
    const userId = req.userId;
    const account = await Accounts.findOne({
        userId : userId
    })
    res.status(200).json({
        balance: account.balance
    })
})


router.post("/transfer",authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const amount = Number(req.body.amount);
    const to =  req.body.to;//reciever id
    try{
        const account = await Accounts.findOne({
            userId : req.userId
        })
       

    if(!account || account.balance < amount){
        return res.status(411).json({
            "Msg" : "Check your Account details"
        })
    }

    const to_account = await Accounts.findOne({
        userId : to
    })

    if(!to_account){
        return res.status(411).json({
            "Msg" : "Reciever is not found"
        })
    }
    
    await Accounts.updateOne({
        userId : req.userId
    },{$inc : {balance : -amount}})

    await Accounts.updateOne({
        userId : to
    },{$inc : {balance : amount}})
    
    }
    catch(err){
        console.log(err)
    }
    await session.commitTransaction();
    res.status(200).json({
        "Msg" : "Transaction is successfull"
    })
})






module.exports = router;