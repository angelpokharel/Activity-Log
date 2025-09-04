import { useParams, useNavigate } from "react-router-dom";
import type { Activity } from "../types";

interface ActivityViewProps {
  activities: Activity[];
}

export default function ActivityView({ activities }: ActivityViewProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const userJson = localStorage.getItem("currentUser");
  const user = userJson ? JSON.parse(userJson) : null;

  const activity = activities.find(
    (a) => a.id === id && a.email === user?.email
  );

  if (!activity) {
    return <p className="p-4 text-red-500">Activity not found</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800">View Activity</h1>
        <span className="text-xs text-gray-500">
          {new Date(activity.createdAt).toLocaleString()}
        </span>
      </div>


      <div className="border border-gray-300 rounded-lg p-3 mb-4 bg-white">
        <p className="whitespace-pre-wrap break-words text-gray-800">
          {activity.content || "No content"}
        </p>
      </div>


      <div className="flex justify-end">
        <button
          onClick={() =>
            navigate(`/users/${encodeURIComponent(user.email)}/activity`)
          }
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}
