Lines changed: 66 additions & 0 deletions
Original file line number	Original file line	Diff line number	Diff line change
@@ -0,0 +1,66 @@
const express=require('express');
const Student=require('../models/Student');
const upload=require('../middleware.js/upload');
const fs=require('fs');
const dotenv=require('dotenv');
const router=express.Router();
dotenv.config()
//create a student
router.post('/', upload.single('image'),async (req, res)=>{
    try{
        const{name,age,grade}=req.body;
        const image=req.file? req.file.path:null;
        const student=await Student.create({name,age,grade,image});
        res.json(student);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
// Read all Students
router.get('/', async (req, res)=>{
    try{
        const students=await Student.find();
        res.json(students);
    }catch(err){
      res.status(500).json({error:err.message});
    }
});
//Update Student
router.put('/:id',upload.single('image'),async(req,res)=>{
    try{
        const { name,age,grade}=req.body;
        let updateData={name,age,grade};
        if(req.file){
            const student=await Student.findById(req.params.id);
            if(student.image) fs.unlinkSync(student.image);
            updateData.image=req.file.path;
        }
        const updateStudent=await Student.findByIdAndUpdate(req.params.id, updateData, {new:true});
        res.json(updateStudent);
    }catch (err){
    
            res.status(500).json({error:err.message});
        }
});
//Delete Student
router.delete('/:id', async (req, res)=>{
    try{
        const student=await Student.findById(req.params.id);
        if(student.image) fs.unlinkSync(student.image);//Delete iamge
        await Student.findByIdAndDelete(req.params.id);
        res.json({message:'Student deleted'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
})
