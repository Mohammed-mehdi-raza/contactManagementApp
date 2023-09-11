import {useContext} from 'react';
import {AiOutlinePlus} from "react-icons/ai";
import {HiSortAscending} from "react-icons/hi";
import {HiSortDescending} from "react-icons/hi";

import MyContext from '../../context/Mycontext';

const TopBar = () => {

  const {setState} =useContext(MyContext) as any;

  const handleAdd=()=>{
    setState(true)
  }

  return (
    <div className="bg-indigo-900 flex justify-between p-2 bg-opacity-80 sticky">
      <p className="text-white mt-1">Contacts</p>
      <div className="text-slate-600">
        <input className="sm:w-44 p-2 text-sm rounded-2xl mr-3" type="text" name="search" id="search" placeholder="Search contacts"/>
        <button className="mr-3 bg-white p-2 rounded-md" title='Sort in Ascending'> <HiSortAscending/> </button>
        <button className="mr-3 bg-white p-2 rounded-md" title='Sort in Descending'> <HiSortDescending/> </button>
        <button className="mr-3 bg-white p-2 rounded-md" onClick={handleAdd} title='Add Contact'> <AiOutlinePlus/> </button>
      </div>
    </div>
  )
}

export default TopBar;
