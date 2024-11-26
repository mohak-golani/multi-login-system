import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user information
    fetch("http://localhost:3000/profile")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        setUserInfo(data.user); // Assuming backend sends user details under `user`
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    // Handle logout
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        window.location.href = "/"; // Redirect to the home page or login page
      })
      .catch((error) => console.error("Error during logout:", error));
  };

  if (loading) {
    return <h2>Loading user information...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!userInfo) {
    return <h2>No user information available</h2>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>User Profile</h1>
      <div
        style={{
          display: "inline-block",
          textAlign: "left",
          maxWidth: "400px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <p>
          <strong>Name:</strong> {userInfo.profile.displayName || "N/A"}
        </p>
        <p>
          <strong>User ID:</strong> {userInfo.profile.id || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {userInfo.profile.emails?.[0]?.value || "N/A"}
        </p>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
