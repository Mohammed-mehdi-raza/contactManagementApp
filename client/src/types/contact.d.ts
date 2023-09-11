export interface Contact{
    name:string,
    email:string,
    SPOC:string,
    mobileNo:string,
    createdDate?:Date,
}

export type ContactContextType={
    contact:Contact;
    setContact:()=>{};
}