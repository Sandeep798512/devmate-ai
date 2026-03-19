const fs = require("fs");
const path = require("path");
const axios = require("axios");

function getLocalContext(folderPath) {
  let context = "";

  const files = fs.readdirSync(folderPath);

  files.forEach(file => {
    const filePath = path.join(folderPath, file);

    if (fs.lstatSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath, "utf-8");

      context += `\nFILE: ${file}\n${content.substring(0, 1000)}\n`;
    }
  });

  return context;
}

async function getGitHubContext(repoUrl) {
  try {
    const apiUrl = repoUrl.replace("github.com", "api.github.com/repos");

    const res = await axios.get(apiUrl + "/contents");

    let context = "";

    for (let file of res.data) {
      if (file.type === "file") {
        const fileData = await axios.get(file.download_url);

        context += `\nFILE: ${file.name}\n${fileData.data.substring(0, 1000)}\n`;
      }
    }

    return context;
  } catch (err) {
    return "";
  }
}

module.exports = { getLocalContext, getGitHubContext };