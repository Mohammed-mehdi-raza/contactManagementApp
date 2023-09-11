import {useState} from "react";

import './App.css';
import Contacts from './components/Contacts/Contacts';
import TopBar from './components/TopBar/TopBar';
import AddContactForm from './components/AddContactForm/AddContactForm';
import MyContext from "./context/Mycontext";

function App() {

  const [state,setState] = useState<{}>(false);

  return (
    <MyContext.Provider value={{setState}}>
      <>
        <TopBar/>
        <Contacts/>
        {
          state ? <AddContactForm/> : <></>
        }
      </>
    </MyContext.Provider>
  )
}

export default App
