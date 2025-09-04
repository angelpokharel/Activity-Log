import { useNavigate } from "react-router-dom";
import type { Activity } from "../types";

type ActivityLogProps = {
    activities: Activity[];
    addActivity: () => string;
    updateActivity: (id: string, updatedActivity: Activity) => void;
    deleteActivity: (id: string) => void;
};

export default function ActivityLog({
    activities,
    addActivity,
    deleteActivity,
}: ActivityLogProps) {
    const navigate = useNavigate();

    const userJson = localStorage.getItem("currentUser");
    const user = userJson ? JSON.parse(userJson) : null;

    const userActivities = activities.filter(
        (a) => a.email === user?.email
    );

    const handleAdd = () => {
        const newId = addActivity();
        if (!newId) return;
        navigate(`/users/${encodeURIComponent(user.email)}/activity/${newId}/edit`);
    };

    return (
        <div className="bg-gray-200 rounded-2xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Activity Log</h2>
                <button
                    onClick={handleAdd}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    + Add Activity
                </button>
            </div>

            {userActivities.length === 0 && <p>No activities yet</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userActivities.map((activity) => (
                    <div
                        key={activity.id}
                        className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow"
                    >

                        <div className="text-gray-500 text-xs mb-2">
                            {new Date(activity.createdAt).toLocaleString()}
                        </div>


                        <p className="text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
                            {activity.content || "No content"}
                        </p><br></br>


                        <div className="flex justify-between">
                            <button
                                className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
                                onClick={() =>
                                    navigate(
                                        `/users/${encodeURIComponent(user.email)}/activity/${activity.id}/edit`
                                    )
                                }
                            >
                                Edit
                            </button>
                            <button
                                className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                onClick={() =>
                                    navigate(
                                        `/users/${encodeURIComponent(user.email)}/activity/${activity.id}/view`
                                    )
                                }
                            >
                                View
                            </button>
                            <button
                                className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                onClick={() => deleteActivity(activity.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
