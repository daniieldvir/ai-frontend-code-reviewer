import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import { rules } from "./groq-rules.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:4200', 'https://daniieldvir.github.io'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Backend is running! 🚀");
});

// Groq client (using OpenAI compatible SDK)
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

// Function that builds the prompt for the AI
function buildPrompt(code, framework) {
  // Normalize framework name to lowercase for rules lookup
  const frameworkKey = framework.toLowerCase();
  const frameworkRules = rules[frameworkKey] || "";

  return `
You are a senior frontend engineer.
Analyze the following ${framework} code.
Focus on performance, readability, and best practices.

CRITICAL: First check for syntax errors, compilation errors, and missing dependencies.
These MUST be marked with severity "high" or "critical".
Examples:
- Missing imports
- Missing required dependencies (like inject() calls in Angular)
- Syntax errors
- Type errors that would prevent compilation
- Undefined variables or methods

IMPORTANT RULES FOR ${framework.toUpperCase()}:
${frameworkRules}

Return ONLY valid JSON with this structure:
{
  "score": number, (0-100)
  "issues": [
    {
      "category": "performance|readability|security|best-practice|syntax|compilation",
      "severity": "low|medium|high|critical",
      "explanation": "string",
      "suggestion": "string"
    }
  ]
}

Code to analyze:
${code}
`;
}

app.post("/analyze", async (req, res) => {
  const { code, framework } = req.body;

  if (!code || !framework) {
    return res.status(400).json({ error: "Missing code or framework" });
  }

  try {
    // Call to Groq
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: buildPrompt(code, framework) }],
      temperature: 0,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;

    try {
      const result = JSON.parse(content);

      // Add unique IDs to each issue
      if (result.issues && Array.isArray(result.issues)) {
        result.issues = result.issues.map((issue, index) => ({
          ...issue,
          id: `issue-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`
        }));
      }

      res.json(result);
    } catch (err) {
      console.error("Failed to parse JSON:", content);
      throw new Error("Invalid JSON response from AI");
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "AI analysis failed",
      details: err.message,
      // Fallback response so frontend doesn't break
      score: 0,
      issues: [{
        id: `issue-error-${Date.now()}`,
        category: "error",
        severity: "high",
        explanation: "The AI service is currently unavailable or returned an invalid response.",
        suggestion: "Please check your API key and internet connection."
      }]
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

