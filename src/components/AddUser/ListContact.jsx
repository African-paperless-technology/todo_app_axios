import utilisateur from "../../assets/utilisateur.png";
import delete_img from "../../assets/delete_img.png";
import { useContext, useState } from "react";
import { ContactContext } from "../../context/ContactProvider";
import Modal from "../../components/Modal/Modal";
import { Pencil } from "lucide-react";

const ListContact = ({ searchTerm }) => {
  const { contacts } = useContext(ContactContext);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };

  return (
    <>
      {contacts == null ||
      (Array.isArray(contacts) && contacts.length === 0) ? (
        <p className="bg-gray-100 shadow-md rounded-lg p-4 text-center font-semibold">
          AUCUNE DONNEE 😵😵
        </p>
      ) : (
        <ul className="bg-gray-100 shadow-md rounded-lg p-4">
          {contacts
            .filter((person) => person && person.name)
            .filter((person) =>
              person.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((person) => (
              <li
                key={person.id}
                onClick={() => setSelectedPerson(person)}
                className="cursor-pointer flex items-center mb-4 p-2 hover:bg-gray-100 transition duration-200 ease-in-out rounded-lg border border-gray-300"
              >
                <img
                  src={utilisateur}
                  className="w-10 h-10 rounded-full mr-4"
                  alt="Utilisateur"
                />
                <span className="flex-grow text-gray-800">{person.name}</span>

                <Pencil className="pr-1 mr-3" />
                <img
                  src={delete_img}
                  className="w-8 h-8 rounded-full text-gray-600 hover:text-red-500 cursor-pointer transition duration-200 ease-in-out"
                  onClick={(e) => {
                    e.stopPropagation();
                    // removeContact(person.id);
                  }}
                  alt="Supprimer"
                />
              </li>
            ))}
        </ul>
      )}

      {selectedPerson && (
        <Modal person={selectedPerson} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ListContact;
