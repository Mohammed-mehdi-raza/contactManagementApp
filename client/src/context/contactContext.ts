import React from "react";
import { ContactContextType } from "../types/contact";

export const contactContext = React.createContext<ContactContextType | null>(null);