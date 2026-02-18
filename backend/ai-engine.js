import OpenAI from "openai";
import { rules } from "./groq-rules.js";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

export async function analyzeCode({ code, framework }) {
  const frameworkRules = rules[framework] || "";

  const prompt = `
You are a senior frontend engineer.
Analyze the following ${framework} code.
Focus on performance, readability, best practices.

RULES:
${frameworkRules}

Return ONLY JSON with structure:
{
  "score": number,
  "issues": [
    {
      "category": string,
      "severity": string,
      "explanation": string,
      "suggestion": string
    }
  ]
}

Code:
${code}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
    response_format: { type: "json_object" }
  });

  const result = JSON.parse(response.choices[0].message.content);
  return result;
}
