import {useState,useEffect} from "react";
import { toast,Toaster } from "react-hot-toast";

import './App.css';
import Contacts from './components/Contacts/Contacts';
import TopBar from './components/TopBar/TopBar';
import AddContactForm from './components/AddContactForm/AddContactForm';
import MyContext from "./context/Mycontext";
import { contactContext } from "./context/contactContext.ts";
import { Contact } from "./types/contact";
import { useAppDispatch } from "./features/Contacts/hooks/hooks";
import { FETCHALL } from "./features/Contacts/contactsSlice";
import {fetchContacts} from "./api/index.ts";

function App() {

  const [state,setState] = useState<{}>(false);
  const [contactData,setContactData] =useState<Contact>({name:"",email:"",SPOC:"",mobileNo:""});

  const dispatch = useAppDispatch();

  const fetchData = async()=>{
    const {data} =await fetchContacts();
    if(!data.success){
      toast.error(data.message);
    }else{
      dispatch(FETCHALL(data.data));
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <contactContext.Provider value={{contactData,setContactData}}>
      <MyContext.Provider value={{setState}}>
        <>
          <TopBar/>
          <Toaster/>
          <Contacts/>
          {
            state ? <AddContactForm/> : <></>
          }
        </>
      </MyContext.Provider>
    </contactContext.Provider>
  )
}

export default App
