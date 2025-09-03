function Profile() {
    const userJson = localStorage.getItem("currentUser");
    const user = userJson ? JSON.parse(userJson) : null;

    return (
        <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold mb-4">Your Profile</h2>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>User not found</p>
            )}
        </div>
    );
}

export default Profile;
