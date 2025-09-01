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

  const existingActivity = activities.find((a) => a.id === id);
  const [content, setContent] = useState(existingActivity?.content || "");

  if (!id || !existingActivity) {
    return <p className="p-4 text-red-500">Activity not found</p>;
  }

  const handleSave = () => {
    onUpdateActivity(id, { ...existingActivity, content });
    navigate("../activity");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Activity</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Activity"
        className="border p-2 bg-white w-full h-40 mb-3 rounded"
      />
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Save
      </button>
    </div>
  );
}
