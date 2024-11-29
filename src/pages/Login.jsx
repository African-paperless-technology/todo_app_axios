import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router";

const Login = () => {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/peopleInfo");
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg w-full sm:w-1/2 max-w-md">
          <h1 className="text-2xl font-bold mb-6">Connexion</h1>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Votre email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 focus:border-blue-500 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Votre mot de passe"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Se connecter
              </button>
              <a
                onClick={() => setIsUserOpen(true)}
                href="#"
                className="inline-block align-baseline text-sm text-blue-500 pl-5 hover:text-blue-800"
              >
                Mot de passe oublié ?
              </a>
            </div>
          </form>
        </div>
        {isUserOpen && <ForgotPassword onClose={() => setIsUserOpen(false)} />}
      </div>
    </div>
  );
};

export default Login;
