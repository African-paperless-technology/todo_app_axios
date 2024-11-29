import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "./context/ContactProvider";
import ListContact from "./components/AddUser/ListContact";
import AddContact from "./components/AddUser/AddContact";

function PersonInfo() {
  const navigate = useNavigate();
  const { contacts, addContact, getAllContacts } = useContext(ContactContext);

  const handleClick = () => {
    navigate("/");
  };
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // const [confirmationMessage, setConfirmationMessage] = useState("");

  // const retrieveContacts = async () => {
  //   const response = await api.get("/contacts");
  //   return response.data;
  // };

  // const addContact = async (name, email, telephone) => {
  //   try {
  //     const request = {
  //       id: nanoid(3),
  //       name: name,
  //       email: email,
  //       telephone: telephone,
  //     };
  //     const response = await api.post("/contacts", request);
  //     setContacts((value) => [...value, response.data]);
  //     console.log(response);

  //     if (response) {
  //       console.log(confirmationMessage);
  //       setTimeout(() => {
  //         console.log("Formulaire fourni avec succès");
  //         setConfirmationMessage("Formulaire fourni avec succès");
  //       }, 2);
  //     }
  //   } catch (error) {
  //     console.error("Error add contact:", error);
  //   }
  // };

  // const removeContact = async (id) => {
  //   try {
  //     console.log("ID to remove:", id);
  //     if (!id) {
  //       console.error("ID is undefined or null");
  //       return;
  //     }
  //     await api.delete(`/contacts/${id}`);
  //     const newContact = contacts.filter((contact) => contact.id !== id);
  //     setContacts(newContact);
  //   } catch (error) {
  //     console.error("Error removing contact:", error);
  //   }
  // };

  useEffect(() => {
    // const getAllContacts = async () => {
    //   const allContacts = await retrieveContacts();
    //   if (allContacts) setContacts(allContacts);
    //   console.log(allContacts)
    // };
    getAllContacts();
  }, []);

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white px-12 rounded-lg shadow-lg w-full sm:w-1/2 max-w-md">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl flex justify-center font-bold mb-6">
            APT-MEMBERS
          </h1>

          <div className="flex items-center mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 flex-1"
              placeholder="Rechercher une personne"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setIsAddUserOpen(true)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Ajouter un membre
            </button>
          </div>
          <ListContact contacts={contacts} searchTerm={searchTerm} />
          
          {isAddUserOpen && (
            <AddContact
              onClose={() => setIsAddUserOpen(false)}
              addContact={addContact}
            />
          )}
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="  bg-gray-300 hover:bg-gray-400 text-black font-semibold py-1 px-2 rounded"
        >
          Deconnexion
        </button>
      </div>
    </div>
  );
}

export default PersonInfo;
