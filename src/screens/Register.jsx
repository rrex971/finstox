import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaUserPlus, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import transition from '../transition';
import API_BASE from '../apiConfig';

const Register = (props) => {
  const [uname, setUName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [debouncedUname, setDebouncedUname] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUname(uname);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [uname]);

  useEffect(() => {
    if (debouncedUname) {
      checkUsernameAvailability(debouncedUname);
    }
  }, [debouncedUname]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = {
      uname: uname,
      password: password,
      email: email,
    };
    const sendData = JSON.stringify(formdata);

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: sendData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.detail);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.detail);
        setSuccess(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(`${API_BASE}/checkUsername?query=${username}`);
      const data = await response.json();
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div className="flex justify-center font-body items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="w-96 bg-woodsmoke-950 border text-mercury-200 border-woodsmoke-800 p-8 rounded-xl shadow-xl text-center">
          <h2 className="text-3xl font-bold text-woodsmoke-100 mb-4"><FaUserPlus className="inline mr-2 text-accent-400" />Register</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className="mt-4">
            <label className="flex items-center gap-1.5 text-woodsmoke-300 font-semibold pb-2"><FaUser className="text-xs" /> Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              value={uname}
              onChange={(e) => setUName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="flex items-center gap-1.5 text-woodsmoke-300 font-semibold pb-2"><FaEnvelope className="text-xs" /> Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="mt-4">
            <label className="flex items-center gap-1.5 text-woodsmoke-300 font-semibold pb-2"><FaLock className="text-xs" /> Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center space-x-3">
            <button
              className="w-full mt-6 py-3 text-mercury-200 bg-accent-500 hover:bg-accent-600 rounded-xl text-lg font-semibold transition-colors duration-200 cursor-pointer"
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default transition(Register);

