const express=require('express')
const router = express.Router()
const Task = require('../models/Task')
const { mongoose } = require('mongoose')

router.get('/', async (req,res)=>{
    try {
        const results = await Task.find()
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
        const results = await Task.findById(id)
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
        const results = (await Task.find({code:cid}))
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
        const {title,description,project,assignedTo,dueDate} = req.body
        if (!title||!description||!project||!assignedTo||!dueDate) {
            res.status(400).send("Please provide the required fileds!")
        } else {
            const results = await project.create({title,description,project,assignedTo,dueDate})
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
        const uTask = await Task.findById(id)
        const {title,description,project,assignedTo,dueDate} = req.body
        if (!title||!description||!project||!assignedTo||!dueDate) {
            res.status(400).send("Please provide the required fileds!")
        } else {
            const results = await uTask.updateOne({title,description,project,assignedTo,dueDate})
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
        const dTask= await Task.findById(id)
        const results = await dproject.deleteOne(dTask).catch(
            (error)=>{ return res.status(500).json(error)}
        )
        res.status(200).json(results)
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})
module.exports=router
