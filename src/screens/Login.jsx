import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    const role = "User";
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
            const response = await fetch(`http://localhost:8023/${role.toLowerCase()}/login`, {
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
            localStorage.setItem('role', role.toLowerCase());
            localStorage.setItem('username', username);
            navigate(redirectPath);
          }

        
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-woodsmoke-950">
            <form onSubmit={handleLogin}>
                <div className="w-96 bg-woodsmoke-950 border border-woodsmoke-700 p-8 rounded-xl shadow-xl text-center">
                
                    <h2 className="text-3xl font-bold text-woodsmoke-100 mb-4">{role} Login</h2>
                    
                    {error && <p className="text-red-500">{error}</p>}
                    
                    <div className="mt-4">
                        <label className="block text-woodsmoke-300 font-semibold">Username</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    
                    <div className="mt-4">
                        <label className="block text-woodsmoke-300 font-semibold">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 border border-woodsmoke-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        className="w-full mt-6 py-3 bg-orange-400 text-white rounded-lg text-lg font-semibold hover:bg-orange-500 transition"
                        type="submit"
                    >
                        Log In
                    </button>
                    
                </div>
            </form>
        </div>
    );
};

export default Login;
