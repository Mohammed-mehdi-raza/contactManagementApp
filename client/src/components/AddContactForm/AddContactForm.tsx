import {useContext} from "react";
import {AiOutlineClose} from "react-icons/ai";

import MyContext from "../../context/Mycontext";
import './style.css';
import { useAppContext, useAppDispatch } from "../../features/Contacts/hooks/hooks";
import { ADD, UPDATE } from "../../features/Contacts/contactsSlice";
import { createContact, updateContact } from "../../api/index.ts";
import toast from "react-hot-toast";

const AddContactForm = () => {

  const {setState}=useContext(MyContext) as any;  

  const {contactData,setContactData} = useAppContext();

  const dispatch = useAppDispatch();

  const closeForm=()=>{
    setState(false);
  }

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setContactData({...contactData,[e.target.name]:e.target.value})
  }

  const handleSubmit=async()=>{
    setState(false);
    if(contactData._id){
      const {data} = await updateContact(contactData,contactData._id);
      if(!data.success){
        toast.error(data.message);
      }else{
        dispatch(UPDATE(data.data));
        toast.success(data.message);
      }
    }else{
      const {data} = await createContact(contactData);
      if(!data.success){
        toast.error(data.message);
      }else{
        dispatch(ADD(data.data));
        toast.success(data.message);
      }
    }
  }

  const handleClear=()=>{
    setContactData({name:"",email:"",SPOC:"",mobileNo:""})
  }

  return (
    <div className="absolute grid justify-center items-center sm:w-screen sm:h-screen top-0 bg-gray-400 bg-opacity-50">
        <div className="sm:w-96 sm:h-96 shadow-lg rounded-2xl bg-white p-2">
            <div className="flex justify-between p-2">
                <p className="text-xl">Add Contact</p>
                <button onClick={closeForm} className="text-red-500 p-2 rounded-full hover:bg-gray-300 hover:ease-in duration-150"> <AiOutlineClose/> </button>  
            </div>
            <div className="box grid grid-cols-1 p-2">
                <input type="text" name="name" id="name" placeholder="Name" value={contactData.name} onChange={handleChange} />
                <input type="text" name="email" id="email" placeholder="email" value={contactData.email} onChange={handleChange}/>
                <input type="text" name="SPOC" id="SPOC" placeholder="SPOC" value={contactData.SPOC} onChange={handleChange}/>
                <input type="text" name="mobileNo" id="number" placeholder="Mobile Number" value={contactData.mobileNo} onChange={handleChange}/>
                <div className="but flex justify-around mt-1">
                    <button className="bg-blue-600 hover:bg-opacity-70 hover:text-black hover:ease-in duration-150" onClick={handleSubmit}>Submit</button>
                    <button className="bg-red-600 hover:bg-opacity-70 hover:text-black hover:ease-in duration-150" onClick={handleClear}>Clear</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddContactForm
