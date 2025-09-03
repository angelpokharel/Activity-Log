import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserPage from "./pages/UserPage";
import ActivityLog from "./pages/activitylog";
import Profile from "./pages/profile";
import type { Activity } from "./types";
import ActivityEdit from "./activity/edit";
import ActivityView from "./activity/view";

export default function App() {
  const savedActivities = localStorage.getItem("activities");
  const [activities, setActivities] = useState<Activity[]>(
    savedActivities ? JSON.parse(savedActivities) : []
  );

  const [nextId, setNextId] = useState(1);

  const addActivity = (): string => {
    const userJson = localStorage.getItem("currentUser");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user?.email) return "";

    const id = String(nextId);
    const newActivity: Activity = {
      id,
      content: "",
      createdAt: new Date().toISOString(),
      email: user.email,
    };

    const newActivities = [newActivity, ...activities];
    setActivities(newActivities);
    localStorage.setItem("activities", JSON.stringify(newActivities));
    setNextId(nextId + 1);
    return id;
  };

  const updateActivity = (id: string, updatedActivity: Activity) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? updatedActivity : activity
    );
    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));
  };

  const deleteActivity = (id: string) => {
    const filteredActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(filteredActivities);
    localStorage.setItem("activities", JSON.stringify(filteredActivities));
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
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
