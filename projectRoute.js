const express=require('express')
const router = express.Router()
const project = require('../models/Project')
const { mongoose } = require('mongoose')

router.get('/', async (req,res)=>{
    try {
        const results = await project.find()
        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send("Sorry, No Data Found !")
        }  
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})

router.get('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        const results = await project.findById(id)
        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send("Sorry, No Data Found !")
        }  
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})
router.get('/code/:cid', async (req,res)=>{
    try {
        const cid = req.params.cid
        const results = (await project.find({code:cid}))
        const count = results.length
        console.log(count)
        if (results) {
            if (count>0){
                res.status(200).json(results)
            }
            else {
                res.status(404).send("Sorry, No Data Found !")
            }  
           
        } else {
            res.status(404).send("Sorry, No Data Found !")
        }  
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})

router.post('/', async (req,res)=>{
    try {
        const {name,description,manager} = req.body
        if (!name||!description||!manager) {
            res.status(400).send("Please provide the required fileds!")
        } else {
            const results = await project.create({name,description,manager})
            res.status(200).json(results)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})

router.put('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return  res.status(400).send("Invaild ID !")
        }
        const uproject = await project.findById(id)
        const {_id,name,no_of_employee} = req.body
        if (!name||!description||!manager) {
            res.status(400).send("Please provide the required fileds!")
        } else {
            const results = await uproject.updateOne({name,description,manager})
            res.status(200).json(results)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})


router.delete('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return  res.status(400).send("Invaild ID !")
        }
        const dproject= await project.findById(id)
        const results = await ddegree.deleteOne(dproject).catch(
            (error)=>{ return res.status(500).json(error)}
        )
        res.status(200).json(results)
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})
module.exports=router
