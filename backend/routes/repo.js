import express from "express";
import fetch from "node-fetch";
const router = express.Router();

//middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user) {
    return next();
  }
  res.status(401).send("please login ");
}

router.get("/repos", isAuthenticated, async (req, res) => {
  try {
    const { accessToken, provider } = req.user;

    if (!accessToken || !provider) {
      return res.status(400).json({ error: "invalid user session" });
    }

    let apiUrl;
    let headers;

    if (provider === "github") {
      apiUrl = "https://api.github.com/user/repos";
      headers = { Authorization: `Bearer ${accessToken}` };
    } else if (provider === "gitlab") {
      apiUrl = "https://gitlab.com/api/v4/projects";
      headers = { Authorization: `Bearer ${accessToken}` };
    }

    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      return res.status(response.status).json({
        error: "failed to fetch repositories",
        details: await response.text(),
      });
    }

    const repos = await response.json();
    res.json(repos);
  } catch (error) {
    console.error("error fetching repositories", error);
    res.status(500).send("internal server error");
  }
});

export default router;
