import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { FaSignInAlt, FaUser, FaLock } from "react-icons/fa";
import transition from "../transition";
import API_BASE from "../apiConfig";

const Login = () => {
  const redirectPath = "/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setError("Both fields are required!");
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=password&username=${username}&password=${password}`,
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.detail);
        setToken(null);
      }
    } catch (error) {
      console.error(error);
    }

    if (token !== null) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      navigate(redirectPath);
    }


  };

  return (
    <div className="flex justify-center items-center min-h-screen font-body">
      <form onSubmit={handleLogin}>
        <div className="w-96 bg-woodsmoke-950 border text-mercury-200 border-woodsmoke-800 p-8 rounded-xl shadow-xl text-center">

          <h2 className="text-3xl font-bold text-woodsmoke-100 mb-4"><FaSignInAlt className="inline mr-2 text-accent-400" />Log In</h2>

          {error && <p className="text-red-500">{error}</p>}

          <div className="mt-4">
            <label className="flex items-center gap-1.5 text-woodsmoke-300 font-semibold pb-2"><FaUser className="text-xs" /> Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-1.5 text-woodsmoke-300 font-semibold pb-2"><FaLock className="text-xs" /> Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full mt-6 py-3 text-mercury-200 bg-accent-500 hover:bg-accent-600 rounded-xl text-lg font-semibold transition-colors duration-200 cursor-pointer"
            type="submit"
          >
            Log In
          </button>
          <div className="mt-4 font-normal text-sm text-woodsmoke-700">
            New to Finstox? <Link to="/register" className="text-accent-400 hover:text-accent-300">Register</Link>&nbsp;here.
          </div>

        </div>
      </form>
    </div>
  );
};


export default transition(Login);
