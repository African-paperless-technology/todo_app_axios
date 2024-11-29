// AddUser.jsx
import { useState } from "react";

const AddContact = ({ addContact, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const newContact = {
    id: crypto.randomUUID(),
    names: name,
    emails: email,
    telephones: telephone,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(newContact);
    setName("");
    setEmail("");
    setTelephone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-11/12 sm:w-1/3">
        <h2 className="text-xl flex justify-center font-bold mb-4">
          Ajouter un Membre
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Nom</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez le nom"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez l'email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Téléphone
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Entrez le numéro de téléphone"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
