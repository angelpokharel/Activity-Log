import { useParams, useNavigate } from "react-router-dom";
import type { Activity } from "../types";

interface ActivityViewProps {
  activities: Activity[];
}

export default function ActivityView({ activities }: ActivityViewProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = activities.find(a => a.id === id);

  if (!activity) {
    return <p className="p-4 text-red-500">No activity</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <p className="mb-4">{activity.content}</p>
      <button
        onClick={() => navigate("/users/current/activity")}
        className="text-blue-500 hover:underline"
      >
        Go Back
      </button>
    </div>
  );
}
