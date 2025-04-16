import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import LoadingScreen from "./LoadingScreen";

const Logout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setLoading(false);
        navigate('/');
    }, []);

    return (
        <div className="h-fit min-h-screen text-4xl flex font-body justify-center pt-24 pb-24">
            {loading ? <LoadingScreen /> : (
            <div className="text-mercury-200 bg-woodsmoke-900 border-woodsmoke-700 border rounded-xl w-5/6 flex flex-col py-16 px-16 space-y-16">
                <div className="font-body font-bold pb-4">You have successfully logged out.</div>
            </div>
            )}
        </div>
    )
}

export default Logout;