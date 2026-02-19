# 🚀 AI Frontend Code Reviewer

An intelligent, real-time code analysis tool designed for modern frontend engineers. Paste your code, select your framework, and get instant feedback on performance, readability, and best practices—powered by advanced AI.

![License](https://img.shields.io/github/license/daniieldvir/ai-frontend-code-reviewer?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge&logo=openai&logoColor=white)

---

## ✨ Features

- **Multi-Framework Support**: Specialized rules for Angular, React, Vue, and Vanilla JS.
- **Deep Analysis**: Scans for performance bottlenecks, security risks, and clean code violations.
- **Actionable Suggestions**: Don't just find bugs—get concrete suggestions on how to fix them.
- **Modern UI**: Sleek, responsive design with full **Dark Mode** and **Light Mode** support.
- **Instant Feedback**: High-speed analysis using the Groq Llama-3 model.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 19+
- **Styling**: Vanilla CSS (Modern CSS Variables)
- **State Management**: Angular Signals
- **Deployment**: [GitHub Pages](https://daniieldvir.github.io/ai-frontend-code-reviewer/)

### Backend
- **Runtime**: Node.js (Express)
- **AI Engine**: Groq SDK (Llama-3-70b-versatile)
- **Deployment**: [Render](https://ai-frontend-code-reviewer.onrender.com)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/daniieldvir/ai-frontend-code-reviewer.git
cd ai-frontend-code-reviewer
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create a .env file and add your key:
# GROQ_API_KEY=your_key_here
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200) to see the magic.

---

## 📦 Deployment Workflow

This project is configured with a hybrid deployment model:

1. **Frontend**: Deployed using `gh-pages`.
   - Command: `npm run deploy` (inside `/frontend`)
2. **Backend**: Deployed to Render directly from the `main` branch.
   - Automatic deployment on every `git push origin main`.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to make this tool even better.

---

## 📄 License

This project is licensed under the MIT License.

---

Developed with ❤️ by [Daniel Dvir](https://github.com/daniieldvir)
