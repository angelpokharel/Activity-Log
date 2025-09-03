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
        <div className="bg-white rounded shadow p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Activity Log</h2>
                <button
                    onClick={handleAdd}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    + Add Activity
                </button>
            </div>

            {userActivities.length === 0 && <p>No activities yet</p>}

            {userActivities.map((activity) => (
                <div key={activity.id} className="border p-2 mb-2 rounded">
                    <p>{activity.content || "No content"}</p>
                    <div className="mt-2 space-x-2">
                        <button
                            className="px-2 py-1 text-green-500 rounded hover:text-green-700"
                            onClick={() =>
                                navigate(
                                    `/users/${encodeURIComponent(user.email)}/activity/${activity.id}/edit`
                                )
                            }
                        >
                            Edit
                        </button>
                        <button
                            className="px-2 py-1 text-blue-500 rounded hover:text-blue-700"
                            onClick={() =>
                                navigate(
                                    `/users/${encodeURIComponent(user.email)}/activity/${activity.id}/view`
                                )
                            }
                        >
                            View
                        </button>
                        <button
                            className="px-2 py-1 text-red-500 rounded hover:text-red-700"
                            onClick={() => deleteActivity(activity.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
