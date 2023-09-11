import React from "react";
import { ContactContextType } from "../types/contact";

export const contactContext = React.createContext<ContactContextType | {}>({contact:{},setContact:()=>{}});