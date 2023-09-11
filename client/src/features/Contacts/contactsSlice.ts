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
        FETCHALL:(state,action:PayloadAction<[Contact]>)=>{
            state.value = action.payload;
        },
        ADD:(state,action:PayloadAction<Contact>)=>{
            state.value = [...state.value,action.payload];
        },
        DELETE:(state,action:PayloadAction<string>)=>{
            state.value=state.value.filter((v)=>v._id!==action.payload);
        },
        SEARCH:(state,action:PayloadAction<[Contact]>)=>{
            state.value = action.payload
        },
        ASCENDINGSORT:(state)=>{
            state.value = state.value.sort((a,b)=>(a.name>b.name)?1:((b.name>a.name?-1:0)));
        },
        DESCENDINGSORT:(state)=>{
            state.value = state.value.sort((a,b)=>(a.name>b.name)?-1:((b.name>a.name?1:0)));
        },
        UPDATE:(state,action:PayloadAction<[Contact]>)=>{
            state.value = action.payload;
        }
    }
})

export const {ADD,FETCHALL,DELETE,SEARCH,ASCENDINGSORT,DESCENDINGSORT,UPDATE} = contactsSlice.actions;

export default contactsSlice.reducer;