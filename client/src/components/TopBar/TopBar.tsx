import {useContext,useState} from 'react';
import {AiOutlinePlus} from "react-icons/ai";
import {HiSortAscending} from "react-icons/hi";
import {HiSortDescending} from "react-icons/hi";
import {toast} from "react-hot-toast";

import MyContext from '../../context/Mycontext';
import { useAppDispatch } from '../../features/Contacts/hooks/hooks';
import { ASCENDINGSORT, DESCENDINGSORT, SEARCH } from '../../features/Contacts/contactsSlice';
import { searchContact } from '../../api';

const TopBar = () => {

  const [searchQuery,setSearchQuery] = useState("");
  const {setState} =useContext(MyContext) as any;
  const dispatch = useAppDispatch();

  const handleAdd=()=>{
    setState(true)
  }

  const handleAscendingSort=()=>{
    dispatch(ASCENDINGSORT());
  }

  const handleDescendingSort=()=>{
    dispatch(DESCENDINGSORT());
  }

  const handleChange=(e:any)=>{
    setSearchQuery(e.target.value);
  }

  const handleSearch=async(e:any)=>{
    if(e.keyCode === 13){
      const {data} =  await searchContact(e.target.value);
      if(!data.success){
        toast.error(data.message);
      }else{
        dispatch(SEARCH(data.data));
      }
    }
  }

  return (
    <div className="bg-indigo-900 flex justify-between p-2 bg-opacity-80 sticky">
      <p className="text-white mt-1">Contacts</p>
      <div className="text-slate-600">
        <input className="sm:w-44 p-2 text-sm rounded-2xl mr-3" type="text" name="search" id="search" placeholder="Search contacts" value={searchQuery} onChange={handleChange} onKeyDown={handleSearch}/>
        <button className="mr-3 bg-white p-2 rounded-md hover:bg-opacity-90 hover:ease-in duration-150" title='Sort in Ascending' onClick={handleAscendingSort}> <HiSortAscending/> </button>
        <button className="mr-3 bg-white p-2 rounded-md hover:bg-opacity-90 hover:ease-in duration-150" title='Sort in Descending' onClick={handleDescendingSort}> <HiSortDescending/> </button>
        <button className="mr-3 bg-white p-2 rounded-md hover:bg-opacity-90 hover:ease-in duration-150" onClick={handleAdd} title='Add Contact'> <AiOutlinePlus/> </button>
      </div>
    </div>
  )
}

export default TopBar;
