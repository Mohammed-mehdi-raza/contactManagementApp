import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contacts = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    SPOC:{
        type:String,
        require:true
    },
    mobileNo:{
        type:String,
        unique:true,
        require:true
    },
    createdDate:{
        type:Date,
        default:new Date()
    }
});

const contact = mongoose.model('contacts',contacts);

export default contact;