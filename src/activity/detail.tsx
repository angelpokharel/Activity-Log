import { useParams } from "react-router-dom";
import type { Activity } from "../types";

interface ActivityProps {
    activities: Activity[];
}

export default function ActivityDetail({ activities }: ActivityProps) {
    const { id } = useParams();
    const activity = activities.find((a) => a.id === id);

    if (!activity) {
        return (
            <div className="p-4">
                <p className="text-red-300">Activity not found</p>

            </div>
        );
    }

    return (
        <div className="p-4 max-w-xl mx-auto">
            <p className="mb-4">{activity.content}</p>
        </div>
    );

}
