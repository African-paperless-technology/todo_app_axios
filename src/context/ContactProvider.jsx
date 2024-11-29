import { createContext, useState } from "react";
import { createContact, deleteContact, getContact } from "../service/AxiosConfig";

export const ContactContext = createContext();

function ContactProvider(props) {

  const [contacts, setContacts] = useState([]);

  const getAllContacts = async () => {
    try {
      const responses = await getContact();
      setContacts(responses.data);
    } catch (error) {
      console.error(error);
    }
  };
  const addContact = async (contact) => {
    try {
      await createContact(contact);
      getAllContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const removeContact = async (id) => {
    try {
      console.log("ID to remove:", id);
      if (!id) {
        console.error("ID is undefined or null");
        return;
      }
    } catch (error) {
      console.error("Error removing contact:", error);
    }
  };


  return (
    <ContactContext.Provider value={{ contacts, addContact, getAllContacts, deleteContact }}>
      {props.children}
    </ContactContext.Provider>
  );
}

export default ContactProvider;
