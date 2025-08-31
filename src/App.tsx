import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserPage from "./pages/UserPage";
import ActivityLog from "./pages/activitylog";
import Profile from "./pages/profile";
import type { Activity } from "./types";
import ActivityEdit from "./activity/edit";
import ActivityDetail from "./activity/detail";
import ActivityView from "./activity/view";

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [nextId, setNextId] = useState(1);

  const addActivity = (): string => {
    const id = String(nextId);
    const newActivity: Activity = {
      id,
      content: "",
      createdAt: new Date().toISOString()
    };
    setActivities([newActivity, ...activities]);
    setNextId(nextId + 1);
    return id;
  };

  const updateActivity = (id: string, updatedActivity: Activity) => {
    setActivities(activities.map((activity) =>
      activity.id === id ? updatedActivity : activity
    ));
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/users/:email" element={<UserPage activities={activities} />}>

          <Route
            path="activity"
            element={
              <ActivityLog
                activities={activities}
                addActivity={addActivity}
                updateActivity={updateActivity}
                deleteActivity={deleteActivity}
              />
            }
          />

          <Route
            path="activity/:id/edit"
            element={
              <ActivityEdit
                activities={activities}
                onUpdateActivity={updateActivity}
              />
            }
          />

          <Route
            path="activity/:id/view"
            element={<ActivityView activities={activities} />}
          />

          <Route
            path="activity/:id/detail"
            element={<ActivityDetail activities={activities} />}
          />

          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
