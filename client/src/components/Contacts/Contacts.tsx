import {useState,useContext} from "react";
import {CiMenuKebab} from "react-icons/ci";
import {CgProfile} from "react-icons/cg";
import {IoIosCall} from "react-icons/io";
import {IoChatbubblesOutline,IoChatboxEllipsesOutline,IoCallOutline,IoLogoWhatsapp,IoMailOutline} from "react-icons/io5"
import {BsChatLeftText, BsWhatsapp} from "react-icons/bs";
import {PiChatsCircleBold} from "react-icons/pi";
import {HiOutlineMail} from "react-icons/hi";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {toast} from "react-hot-toast";


import "./Contacts.css";
import MyContext from "../../context/Mycontext";
import { Contact } from "../../types/contact";
import { useAppContext, useAppDispatch, useAppSelector } from "../../features/Contacts/hooks/hooks";
import {DELETE} from "../../features/Contacts/contactsSlice.ts";
import { deleteContact } from "../../api/index.ts";

const Contacts = () => {

  const [editOption,setEditOption] = useState<number>(-1);
  const [editAllOption,setEditAllOption] = useState<boolean>(false);
  const {setState} = useContext(MyContext) as any;
  const contacts:Contact[]=useAppSelector((state)=>state.value);
  const {setContactData} = useAppContext();

  const dispatch = useAppDispatch();

  const handleEditOption=(e:number)=>{
    setEditOption((editOption === -1)?e:-1);
  }

  const handleEditAllOption=()=>{
    setEditAllOption(!editAllOption);
  }

  const handleEdit=(v:Contact)=>{
    setState(true);
    setContactData(v);
  }

  const handleDelete=async(id:any)=>{
    setEditOption(-1);
    const {data} = await deleteContact(id);
    if(!data.success){
        toast.error(data.message);
    }else{
        dispatch(DELETE(id));
        toast.success(data.message);
    }
  }

  return (
    <div className="flex justify-center items-center">
        {
            contacts?.length ?
            <table className="table-auto sm:w-screen m-2 items-start border-collapse">
                <tr className=" bg-indigo-900 bg-opacity-80 text-white text-sm h-12 ">
                    <th className="p-1 flex justify-between h-12">
                        <div className="flex">
                            <input type="checkbox" name="checkbox" id="checkbox" />
                            <p className="pl-2 pt-2">Contact</p>
                        </div>
                        <button onClick={handleEditAllOption} className="rounded-full p-3 hover:bg-gray-400 hover:bg-opacity-50 hover:ease-in duration-100"> <CiMenuKebab/> </button>
                        {
                            editAllOption ? 
                            <div className="absolute bg-white left-72 p-2 shadow-lg rounded-xl">
                                <button title="delete" onClick={handleDelete} className="text-red-600 hover:bg-gray-400 hover:bg-opacity-50 hover:ease-in duration-100 rounded-full p-2"> <AiOutlineDelete/> </button>
                            </div>
                            : <></>
                        }
                    </th>
                    <th className=" p-1 text-center">CTA</th>
                    <th className=" p-1 text-center">SPOC</th>
                    <th className=" p-1 text-center">Mobile</th>
                    <th className=" p-1 text-center">Email</th>
                    <th className=" p-1 text-center">Created Date</th>
                </tr>
                {
                    contacts.map((contact:Contact,i:number)=>{
                        return(
                            <tr>
                                <td>
                                    <td className="flex justify-between p-1 border-none">
                                        <div className="flex">
                                            <input type="checkbox" name="checkbox" id="checkbox" />
                                            <div className="text-2xl ml-2 text-gray-500 mt-1"> <CgProfile/> </div>
                                            <p className="ml-2 mt-1">{contact?.name}</p>
                                        </div>
                                        <button onClick={()=>handleEditOption(i)} className="rounded-full p-2 hover:bg-gray-400 hover:bg-opacity-50 hover:ease-in duration-100"> <CiMenuKebab/> </button>
                                        {
                                            editOption === i ? 
                                            <div className="absolute bg-white left-72 p-2 shadow-lg rounded-xl flex justify-between">
                                                <button title="delete" onClick={()=>handleDelete(contact?._id)} className="mr-2 text-red-600 hover:bg-gray-400 hover:bg-opacity-50 hover:ease-in duration-100 rounded-full p-2"> <AiOutlineDelete/> </button>
                                                <button title="edit" onClick={()=>handleEdit(contact)} className=" hover:bg-gray-400 hover:bg-opacity-50 hover:ease-in duration-100 rounded-full p-2"> <AiOutlineEdit/> </button>
                                            </div>
                                            : <></>
                                        }
                                    </td>
                                </td>
                                <td className="flex justify-evenly pb-3 pt-3">
                                    <div className="text-xl text-gray-500"> <IoCallOutline/> </div>
                                    <div className="text-xl text-gray-500"> <IoChatboxEllipsesOutline/> </div>
                                    <div className="text-xl text-gray-500"> <IoMailOutline/> </div>
                                    <div className="text-xl text-gray-500"> <IoLogoWhatsapp/> </div>
                                    <div className="text-xl text-gray-500"> <IoChatbubblesOutline/> </div>
                                </td>
                                <td className="text-center"> {contact?.SPOC} </td>
                                <td className="text-center"> {contact?.mobileNo} </td>
                                <td className="text-center"> {contact?.email} </td>
                                <td className="text-center"> {contact?.createdDate?.split('T')[0]} </td>
                            </tr>
                        )
                    })
                }
            </table>
        : <>No Contacts to show. Try to add Some</>
        }
    </div>
  )
}

export default Contacts
