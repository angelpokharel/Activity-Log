import { useParams, useNavigate } from "react-router-dom";
import type { Activity } from "../types";
import { useState } from "react";

interface ActivityEditProps {
  activities: Activity[];
  onUpdateActivity: (id: string, updatedActivity: Activity) => void;
}

export default function ActivityEdit({ activities, onUpdateActivity }: ActivityEditProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const userJson = localStorage.getItem("currentUser");
  const user = userJson ? JSON.parse(userJson) : null;

  const existingActivity = activities.find(
    (a) => a.id === id && a.email === user?.email
  );

  const [content, setContent] = useState(existingActivity?.content || "");

  if (!id || !existingActivity) {
    return <p className="p-4 text-red-500">Activity not found</p>;
  }

  const handleSave = () => {
    onUpdateActivity(id, { ...existingActivity, content });
    navigate(`/users/${encodeURIComponent(user.email)}/activity`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800">Edit Activity</h1>
        <span className="text-xs text-gray-500">
          {new Date(existingActivity.createdAt).toLocaleString()}
        </span>
      </div>


      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Activity"
        className="border border-gray-300 rounded-lg p-3 w-full h-40 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
      />


      <div className="flex justify-end space-x-3">
        <button
          onClick={() =>
            navigate(`/users/${encodeURIComponent(user.email)}/activity`)
          }
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}
