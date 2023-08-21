const express = require('express');
const DoctorModel = require('../model/doctorModel');
const auth = require('../middleware/auth');



const doctorRoute = express.Router()

doctorRoute.post("/appointments",auth, async(req,res)=>{


    try {

        const post = DoctorModel(req.body)
        await post.save()

        res.json({message:"Onboarding Successfully Posted", post:post})


        
    } catch (error) {
        res.json({error:error.message})
    }

})

doctorRoute.get("/",auth, async(req,res)=>{

    try {

        const {specialization, sortByDate, search} = req.query

        let filter = {}

        if(specialization){
            filter.specialization = specialization
        }
        if(search){
            filter.name = { $regex : search, $options : "i"}
        }

        let sortOption = {}

        if(sortByDate=="desc"){
            sortOption.date = -1
        }
        else if(sortByDate=="asc"){
            sortOption.date = 1
        }

        const post = await DoctorModel.find(filter).sort(sortOption)
        res.json({posts:post})
        
    } catch (error) {
        res.json({error:error.message})
    }

})

doctorRoute.patch("/appointments/:id",auth, async(req,res)=>{


    try {

        const {id} = req.params

        const updated = await DoctorModel.findByIdAndUpdate(id, req.body)

        const post = await DoctorModel.findById(id)

        res.json({message:"Doctor Details Updated", post:post})
        
    } catch (error) {
        res.json({error:error.message})
    }

})


doctorRoute.delete("/appointments/:id",auth, async(req,res)=>{


    try {

        const {id} = req.params

        const deleted = await DoctorModel.findByIdAndDelete(id)

        const post = await DoctorModel.find()

        res.json({message:"Doctor Details Deleted", post:post})
        
    } catch (error) {
        res.json({error:error.message})
    }

})


module.exports = doctorRoute