import { useState } from "react";

const ForgotPassword = ({ onClose }) => {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-11/12 sm:w-1/3">
        <h2 className="text-xl flex justify-center font-bold mb-4">
          Récupération du mot de passe
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Entrer l adresse mail</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Modifier
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

export default ForgotPassword;
