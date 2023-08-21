const express = require('express');
const UserModel = require('../model/userModel');
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userRoute = express.Router()

userRoute.post("/signup", async(req,res)=>{


    try {

        const {email, password} = req.body

        let userExsist = await UserModel.findOne({email:email})

        if(userExsist){
            return res.json({error:"User Already Exsist"})
        }

        let user = UserModel(req.body)

        bcrypt.hash(password, 10, async function(err, hash) {
            
            user.password = hash
            await user.save()

            res.json({message : "User Registered", user:user})

        });



        
    } catch (error) {
        res.json({error:error.message})
    }

})

userRoute.post("/login", async(req,res)=>{


    try {

        const {email, password} = req.body

        let user = await UserModel.findOne({email:email})

        if(!user){
            res.json({error:"User Does Not Exsist"})
        }

        bcrypt.compare(password, user.password, function(err, result) {
            
            if(result){

                const token = jwt.sign({ userID : user._id, userEmail: user.email }, '123');

                res.json({message:"User Successfully Logged In", token:token})

            }

        });
        
    } catch (error) {
        res.json({error:error.message})
    }

})



module.exports = userRoute