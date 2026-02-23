<div align="center">
  <img src="frontend/public/favicon.png" alt="AI Frontend Code Reviewer Logo" width="200" height="auto" />
  <h1>🚀 AI Frontend Code Reviewer</h1>
  <p>An intelligent, real-time code analysis tool designed for modern frontend engineers. Paste your code, select your framework, and get instant feedback on performance, readability, and best practices—powered by advanced AI.</p>

  <p>
    <a href="https://daniieldvir.github.io/ai-frontend-code-reviewer/"><img src="https://img.shields.io/badge/Live_Demo-Status?style=for-the-badge&logo=rocket&color=success" alt="Live Demo" /></a>
    <img src="https://img.shields.io/github/license/daniieldvir/ai-frontend-code-reviewer?style=for-the-badge" alt="License" />
    <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge&logo=openai&logoColor=white" alt="Groq" />
  </p>
</div>

---

## 📖 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📷 Screenshots](#-screenshots)
- [🚀 Quick Start](#-quick-start)
- [📦 Deployment Workflow](#-deployment-workflow)
- [📄 License](#-license)

---

## ✨ Features

- **Multi-Framework Support**: Specialized review rules tailored for **Angular**, **React**, **Vue**, and **Vanilla JS**.
- **Deep Code Analysis**: Scans for performance bottlenecks, security risks, deprecated patterns, and clean code violations.
- **Actionable AI Suggestions**: Doesn't just find bugs—provides concrete, AI-generated suggestions on how to refactor and fix your code.
- **Modern UI/UX**: Sleek, responsive design with full **Dark Mode** and **Light Mode** support to match your engineering workflow.
- **Instant Lightning-Fast Feedback**: High-speed AI inference powered by the **Groq Llama-3 model**, offering sub-second analysis.

## 🛠️ Tech Stack

### Frontend Client
- **Framework**: Angular 19+
- **Styling**: SCSS / Vanilla CSS (Modern CSS Variables)
- **State Management**: Modern Angular Signals
- **Deployment**: [GitHub Pages](https://daniieldvir.github.io/ai-frontend-code-reviewer/)

### Backend API
- **Runtime**: Node.js with Express.js
- **AI Engine**: Groq SDK (Llama-3-70b-versatile) for blazing fast LLM inference
- **Deployment**: [Render](https://ai-frontend-code-reviewer.onrender.com)

---

## 🚀 Quick Start

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### 1. Clone the repository
```bash
git clone https://github.com/daniieldvir/ai-frontend-code-reviewer.git
cd ai-frontend-code-reviewer
```

### 2. Setup the Backend API
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and add your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3000
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend Client
Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run start
```
Open [http://localhost:4200](http://localhost:4200) in your browser to see the magic happen! 🎉

---

## 📦 Deployment Workflow

This project is configured with a hybrid continuous deployment model:

1. **Frontend**: Deployed using `gh-pages`.
   - Command: `npm run deploy` (run inside the `/frontend` folder)
2. **Backend**: Deployed to Render directly from the `main` branch.
   - Triggers automatic deployment on every `git push origin main`.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

<div align="center">
  Developed with ❤️ by <a href="https://github.com/daniieldvir">Daniel Dvir</a>
</div>
