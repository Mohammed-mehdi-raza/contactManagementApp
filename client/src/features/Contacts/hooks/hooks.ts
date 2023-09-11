import {TypedUseSelectorHook,useDispatch,useSelector} from "react-redux";
import {useContext} from "react";

import type { RootState,AppDispatch } from "../../../app/store";
import { contactContext } from "../../../context/contactContext";
import { ContactContextType } from "../../../types/contact";

export const useAppDispatch=()=>useDispatch<AppDispatch>();

export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;

export const useAppContext=()=>(useContext(contactContext) as ContactContextType);