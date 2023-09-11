export interface Contact{
    _id?:string,
    name:string,
    email:string,
    SPOC:string,
    mobileNo:string,
    createdDate?:string,
}

export type ContactContextType={
    contactData:Contact;
    setContactData:(value:React.SetStateAction<Contact>)=>void;
}