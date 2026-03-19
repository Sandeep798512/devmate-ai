const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function askAI(question, context) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert coding assistant." },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${question}`
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = { askAI };