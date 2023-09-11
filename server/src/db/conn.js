import mongoose from "mongoose";
import 'dotenv/config';

const URI=process.env.MONGO_URI;
mongoose.set('strictQuery',false);

mongoose.connect(URI).then(()=>{
    console.log('connection to database successfull');
}).catch((e)=>{
    console.log(`not connected due to error ${e}`);
})
