import { useState } from "react";
import { useNavigate, Link } from "react-router";
import transition from "../transition";

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
            const response = await fetch(`http://localhost:8000/login`, {
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
          
          if(token!==null){
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            navigate(redirectPath);
          }

        
    };

    return (
        <div className="flex justify-center items-center min-h-screen font-body">
            <form onSubmit={handleLogin}>
                <div className="w-96 bg-woodsmoke-950 border text-mercury-200 border-woodsmoke-700 p-8 rounded-xl shadow-xl text-center">
                
                    <h2 className="text-3xl font-bold text-woodsmoke-100 mb-4">Welcome, log into your account!</h2>
                    
                    {error && <p className="text-red-500">{error}</p>}
                    
                    <div className="mt-4">
                        <label className="block text-woodsmoke-300 font-semibold pb-2">Username</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
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

                    <button 
                        className="w-full mt-6 py-3 border-transparent text-mercury-200 bg-gradient-to-br from-fuchsia-500 to-san-marino-500 rounded-lg text-lg border font-semibold transition-all duration-300 hover:bg-woodsmoke-900 hover:bg-none hover:text-fuchsia-500 hover:border-fuchsia-500"
                        type="submit"
                    >
                        Log In
                    </button>
                    <div className="mt-4 font-normal text-sm text-woodsmoke-700">
                      New to Finstox? <Link to="/register" className="bg-gradient-to-br from-fuchsia-500 to-san-marino-500 text-transparent bg-clip-text">Register</Link>&nbsp;here.
                    </div>
                    
                </div>
            </form>
        </div>
    );
};


export default transition(Login);
