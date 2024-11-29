import utilisateur from "../../assets/utilisateur.png";

const Modal = ({ person, onClose }) => {
  if (!person) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-11/12 sm:w-1/3">
        <img
          src={utilisateur}
          className="w-10 h-10 rounded-full mr-4"
          alt="Utilisateur"
        />
        <span className="text-2xl font-bold">{person.name}</span>

        <p className="text-gray-700">Adresse mail: {person.email}</p>
        <p className="text-gray-700">Numéro de téléphone: {person.telephone}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
