import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Activity } from "../types";

interface UserPageProps {
    activities: Activity[];
}

function UserPage({ activities }: UserPageProps) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("currentUser");
    const user = userJson ? JSON.parse(userJson) : null;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (!token || !user) {
            navigate("/");
        }
    }, [token, user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        navigate("/");
    };

    const userActivities = activities.filter(
        (activity) => activity.email === user?.email
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-lg p-4 flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Activities by Date</h2>
                <div className="flex flex-col gap-2 ">
                    {userActivities.length === 0 ? (
                        <p className="text-gray-500 text-sm">No activities</p>
                    ) : (
                        userActivities.map((activity) => (

                            <button
                                key={activity.id}
                                onClick={() => navigate(`activity/${activity.id}/view`)}
                                className="rounded px-2 py-1 hover:bg-green-100 border border-gray-100 shadow-sm text-left"
                            >
                                {new Date(activity.createdAt).toLocaleString()}
                            </button>

                        ))
                    )}
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Welcome</h1>

                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Menu
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-green-400 rounded shadow-lg flex flex-col">
                                <button
                                    onClick={() => { navigate("activity"); setDropdownOpen(false); }}
                                    className="px-4 py-2 text-left hover:bg-green-100"
                                >
                                    Activity Log
                                </button>
                                <button
                                    onClick={() => { navigate("profile"); setDropdownOpen(false); }}
                                    className="px-4 py-2 text-left hover:bg-green-100"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => { handleLogout(); setDropdownOpen(false); }}
                                    className="px-4 py-2 text-left hover:bg-red-100 text-red-500"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default UserPage;
