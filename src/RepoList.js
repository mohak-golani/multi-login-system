import React, { useEffect, useState } from "react";

const RepoList = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile data
    fetch("http://localhost:3000/api/repos")
      .then(async (response) => {
        const _resp = await response.json();
        setProfile(_resp.data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  console.log("profile", profile);

  if (!profile) return <h2>Loading profile...</h2>;

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>
        Welcome,{" "}
        {profile.user.profile.displayName || profile.user.profile.username}
      </h1>
      <p>Provider: {profile.provider}</p>
      <a href="/api/repos">
        <button>View Repositories</button>
      </a>
    </div>
  );
};

export default RepoList;
