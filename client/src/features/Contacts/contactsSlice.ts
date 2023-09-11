import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../../types/contact";

const initialState={
    value:[{} as Contact]
}

export const contactsSlice = createSlice({
    name:'contacts',
    initialState,
    reducers:{
        ADD:(state,action:PayloadAction<Contact>)=>{
            state.value = [...state.value,action.payload];
        }
    }
})

export const {ADD} = contactsSlice.actions;

export default contactsSlice.reducer;