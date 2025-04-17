import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import transition from '../transition';

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
      const response = await fetch(`https://finapi.rrex.cc/register`, {
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
      const response = await fetch(`https://finapi.rrex.cc/checkUsername?query=${username}`);
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
        <div className="w-96 bg-woodsmoke-950 border text-mercury-200 border-woodsmoke-700 p-8 rounded-xl shadow-xl text-center">
          <h2 className="text-3xl font-bold text-woodsmoke-100 mb-4">Register a new Finstox Account</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className="mt-4">
            <label className="block text-woodsmoke-300 font-semibold pb-2">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              value={uname}
              onChange={(e) => setUName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-woodsmoke-300 font-semibold pb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-woodsmoke-300 font-semibold pb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-woodsmoke-300 font-semibold pb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center space-x-3">
            <button
              className="w-full mt-6 py-3 border-transparent text-mercury-200 bg-gradient-to-br from-fuchsia-500 to-san-marino-500 rounded-lg text-lg border font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500"
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

