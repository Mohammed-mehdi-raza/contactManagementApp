import {useState,useContext,useEffect} from "react";
import {CiMenuKebab} from "react-icons/ci";
import {CgProfile} from "react-icons/cg";
import {IoIosCall} from "react-icons/io";
import {BsChatLeftText, BsWhatsapp} from "react-icons/bs";
import {PiChatsCircleBold} from "react-icons/pi";
import {HiOutlineMail} from "react-icons/hi";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";


import "./Contacts.css";
import MyContext from "../../context/Mycontext";
import { Contact } from "../../types/contact";
import { useAppSelector } from "../../features/Contacts/hooks/hooks";

const Contacts = () => {

  const [editOption,setEditOption] = useState<number>(-1);
  const [editAllOption,setEditAllOption] = useState<boolean>(false);
  const {setState} = useContext(MyContext) as any;
  const contacts:Contact[]=useAppSelector((state)=>state.value)

  const handleEditOption=(e:number)=>{
    setEditOption((editOption === -1)?e:-1);
  }

  const handleEditAllOption=()=>{
    setEditAllOption(!editAllOption);
  }

  const handleEdit=()=>{
    setState(true);
  }

  const handleDelete=()=>{
    console.log("DElete");
  }

  useEffect(()=>{
    console.log(contacts)
  },[contacts])

  return (
    <div className="flex justify-center items-center">
        {
            contacts.length > 0 ?
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
                                                <button title="delete" onClick={handleDelete} className="mr-2 text-red-600 hover:bg-gray-400 hover:bg-opacity-50 hover:ease-in duration-100 rounded-full p-2"> <AiOutlineDelete/> </button>
                                                <button title="edit" onClick={handleEdit} className=" hover:bg-gray-400 hover:bg-opacity-50 hover:ease-in duration-100 rounded-full p-2"> <AiOutlineEdit/> </button>
                                            </div>
                                            : <></>
                                        }
                                    </td>
                                </td>
                                <td className="flex justify-evenly pb-2 pt-3">
                                    <div className="text-lg mt-1 text-gray-500"> <IoIosCall/> </div>
                                    <div className="text-base mt-1 text-gray-500"> <BsChatLeftText/> </div>
                                    <div className="text-2xl text-gray-500"> <HiOutlineMail/> </div>
                                    <div className="text-base mt-1 text-gray-500"> <BsWhatsapp/> </div>
                                    <div className="text-lg mt-1 text-gray-500"> <PiChatsCircleBold/> </div>
                                </td>
                                <td className="text-center"> {contact?.SPOC} </td>
                                <td className="text-center"> {contact?.mobileNo} </td>
                                <td className="text-center"> {contact?.email} </td>
                                <td className="text-center"> {contact?.createdDate?.toISOString().split('T')[0]} </td>
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
