import { createContext, useState } from "react";
import { createContact, removeContact, getContact } from "../service/AxiosConfig";

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
      await contacts.delete(`/contacts/${id}`);
      const newContact = contacts.filter((contact) => contact.id !== id);
      setContacts(newContact);
    } catch (error) {
      console.error("Error removing contact:", error);
    }
  };


  return (
    <ContactContext.Provider value={{ contacts, addContact, getAllContacts, removeContact }}>
      {props.children}
    </ContactContext.Provider>
  );
}

export default ContactProvider;
