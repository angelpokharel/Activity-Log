import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserPage() {
    const { email } = useParams<{ email: string }>();
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");
        const currentUserJson = localStorage.getItem("currentUser");
        const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;

        if (!token || !currentUser || currentUser.email !== email) {
            navigate("/login");
        }
    }, [email, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <p className="text-xl mb-4">Welcome, {email}</p>
            <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
                Logout
            </button>
        </div>
    );
}

export default UserPage;
