const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const { getLocalContext, getGitHubContext } = require("./contextManager");
const { askAI } = require("./aiService");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// MAIN ASK API
app.post("/ask", async (req, res) => {
  const { question, repoUrl } = req.body;

  let context = getLocalContext("../sample_project");

  if (repoUrl) {
    context += await getGitHubContext(repoUrl);
  }

  const answer = await askAI(question, context);
  res.json({ answer });
});

// BUG DETECTION
app.post("/detect-bug", async (req, res) => {
  const { code } = req.body;

  const answer = await askAI("Find bugs and fix:\n" + code, "");
  res.json({ answer });
});

// SUMMARY
app.post("/summarize", async (req, res) => {
  const { code } = req.body;

  const answer = await askAI("Summarize this code:\n" + code, "");
  res.json({ answer });
});

// FILE UPLOAD
app.post("/upload", upload.single("file"), async (req, res) => {
  const fs = require("fs");

  const content = fs.readFileSync(req.file.path, "utf-8");

  const answer = await askAI("Explain this code:\n" + content, "");
  res.json({ answer });
});

app.listen(3000, () => console.log("Server running on port 3000"));