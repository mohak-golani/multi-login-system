import "./App.css";
import RepoList from "./RepoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const handleOnLoginClick = async () => {
    try {
      const resp = await fetch("http://localhost:3000/auth/github");
      console.log("resp", resp);
      window.open(resp.url);
      // console.log("data", data);
    } catch (error) {
      console.error("Error Occured", error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ textAlign: "center", marginTop: "20%" }}>
              <h1>Git Management</h1>
              <a href="http://localhost:3000/auth/github">
                <button style={{ margin: "10px" }}>Login with GitHub</button>
              </a>
              <a href="http://localhost:3000/auth/gitlab">
                <button style={{ margin: "10px" }}>Login with GitLab</button>
              </a>
            </div>
          }
        />
        <Route path="/repo" element={<RepoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
