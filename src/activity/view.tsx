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
    return <p className="p-4 text-red-500">No activity</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto border border-black rounded bg-white">
      <p className="text-sm text-gray-500 mb-1"> id: {activity.id}</p>
      <p className="mb-4">{activity.content}</p>

      <button
        onClick={() => navigate(`/users/${encodeURIComponent(user.email)}`)}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Back
      </button>
    </div>
  );
}
