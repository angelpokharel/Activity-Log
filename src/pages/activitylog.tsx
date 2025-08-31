import { useState } from "react";
import type { Activity } from "../types";
import { useNavigate } from "react-router-dom";

type ActivityLogProps = {
    activities: Activity[];
    addActivity: () => string;
    updateActivity: (id: string, updatedActivity: Activity) => void;
    deleteActivity: (id: string) => void;
};

export default function ActivityLog({ activities, addActivity, updateActivity, deleteActivity }: ActivityLogProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [tempContent, setTempContent] = useState("");
    const navigate = useNavigate();

    const handleAdd = () => {
        const newId = addActivity();
        setEditingId(newId);
        setTempContent("");
    };

    const handleSave = (id: string) => {
        updateActivity(id, { id, content: tempContent, createdAt: activities.find(a => a.id === id)?.createdAt! });
        setEditingId(null);
    };

    return (
        <div className="bg-white rounded shadow p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Activity Log</h2>
                <button
                    onClick={handleAdd}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    + Add Activity
                </button>
            </div>



            {activities.length === 0 && <p>No activities yet.</p>}
            {activities.map((activity) => (
                <div key={activity.id} className="border p-2 mb-2 rounded">
                    {editingId === activity.id ? (
                        <div>
                            <textarea
                                value={tempContent}
                                onChange={(e) => setTempContent(e.target.value)}
                                placeholder="Enter activity content"
                                className="border p-2 w-full mb-2 rounded"
                            />
                            <button
                                onClick={() => handleSave(activity.id)}
                                className="px-2 py-1 text-green-500 rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditingId(null)}
                                className="px-2 py-1 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p>{activity.content || "No content"}</p>
                            <div className="mt-2 space-x-2">
                                <button
                                    className="px-2 py-1  text-green-500 rounded"
                                    onClick={() => { setEditingId(activity.id); setTempContent(activity.content); }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-2 py-1  text-red-500 rounded"
                                    onClick={() => deleteActivity(activity.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}


        </div>
    );
}
