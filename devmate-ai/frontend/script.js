const API = "http://localhost:3000";

async function ask() {
  const input = document.getElementById("input").value;
  const repo = document.getElementById("repo").value;

  const res = await fetch(API + "/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: input, repoUrl: repo })
  });

  const data = await res.json();
  output.innerText = data.answer;
}

async function bug() {
  const code = document.getElementById("input").value;

  const res = await fetch(API + "/detect-bug", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });

  const data = await res.json();
  output.innerText = data.answer;
}

async function summary() {
  const code = document.getElementById("input").value;

  const res = await fetch(API + "/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });

  const data = await res.json();
  output.innerText = data.answer;
}

async function upload() {
  const file = document.getElementById("file").files[0];
  const formData = new FormData();

  formData.append("file", file);

  const res = await fetch(API + "/upload", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  output.innerText = data.answer;
}