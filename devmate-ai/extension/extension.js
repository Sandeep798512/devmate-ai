const vscode = require("vscode");
const axios = require("axios");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "devmate.askAI",
    async function () {
      const editor = vscode.window.activeTextEditor;
      const code = editor.document.getText();

      const res = await axios.post("http://localhost:3000/ask", {
        question: "Explain this code",
        repoUrl: ""
      });

      vscode.window.showInformationMessage(res.data.answer);
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };