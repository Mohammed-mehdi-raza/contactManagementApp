import mongoose from "mongoose";
import contact from "../models/contact.js";

export const getAllContact = async(req,res)=>{
    try {
        const contacts = await contact.find();
        res.status(200).json({
            success:true,
            data:contacts
        })
    } catch (error) {
        res.status(202).json({
            success:false,
            message:error.message
        })
    }
}

export const getContact = async(req,res)=>{
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(202).json({
                success:false,
                message:'Invalid id'
            });
        }
        const cont = await contact.findById(id);
        res.status(200).json({
            success:true,
            data:cont
        })
    } catch (error) {
        res.status(202).json({
            success:false,
            message:error.message
        })
    }
}

export const createContact = async(req,res)=>{
    try {
        const body = req.body;
        if(!body.name || !body.email || !body.SPOC || !body.mobileNo){
            res.status(202).json({
                success:false,
                message:'Every field is required',
            })
        }else{
            const newContact = new contact(body);
            await newContact.save();
            res.status(200).json({
                success:true,
                message:'contact added successfully',
                data:newContact
            })
        }
    } catch (error) {
        res.status(202).json({
            success:false,
            message:error.message
        })
    }
}

export const updateContact = async(req,res)=>{
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(202).json({
                success:false,
                message:'Invalid id'
            });
        }
        const body = req.body;
        if(!body.name || !body.email || !body.SPOC || !body.mobileNo){
            res.status(202).json({
                success:false,
                message:'Every field is required',
            })
        }
        const updateContact = await contact.findByIdAndUpdate(id,body,{new:true});
        const getAll = await contact.find();
        res.status(200).json({
            success:true,
            message:'contact update successfully',
            data:getAll
        })
    } catch (error) {
        res.status(202).json({
            success:false,
            message:error.message
        })
    }
}

export const deleteContact = async(req,res)=>{
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(202).json({
                success:false,
                message:'Invalid id'
            });
        }
        await contact.findByIdAndRemove(id);
        res.status(200).json({
            success:true,
            message:"contact deleted successfully"
        })
    } catch (error) {
        res.status(202).json({
            success:false,
            message:error.message
        })
    }
}

export const searchContact =async(req,res)=>{
    try {
        const name = req.params.name;
        if(!name){
            res.status(202).json({
                success:false,
                message:"name is required"
            })
        }
        const filtered = await contact.find({name:name});
        res.status(200).json({
            success:true,
            data:filtered
        })
    } catch (error) {
        res.status(202).json({
            success:false,
            message:error.message
        })
    }
}

