# WordPlay 🎯

**WordPlay** is a fun and interactive word-guessing game built with **Next.js** for the frontend and **n8n** for backend automations.

---

## ✨ Core Features

- **Word Selection**: Randomly select a word for users to guess.
- **Word Display**: Show the masked word (e.g., `_ _ _ _`) with correctly guessed letters revealed.
- **Letter Guessing**: Allow users to guess letters and progressively reveal the word.
- **State Management**: Track guessed letters and remaining attempts.
- **n8n Backend**: Use n8n workflows to automate word selection and manage game state or leaderboards.

---

## ⚙️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
- **Backend Automations**: [n8n](https://n8n.io/)
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui, Radix UI
- **Deployment**: Vercel for frontend, n8n self-hosted.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Chathuraje/game-wordplay.git
cd game-wordplay
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up n8n

- Create a workflow that:
  - Selects a random word from a list/database.
  - Returns the word via an HTTP endpoint (using n8n's HTTP Request Trigger and Response nodes).
- Secure your n8n endpoints with authentication or restrict allowed origins.

Example n8n Flow:

- Trigger: HTTP Request (GET `wordplay/get-word`)
- Action: Return a random word

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

### 5. Run the App

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to play!

---

## 📈 Future Improvements

- Add difficulty levels (easy/medium/hard words).
- Timer and scoring system.
- Multiplayer or challenge mode.
- Animated win/lose screens.
- Save game progress using localStorage or backend.
- Leaderboard managed through n8n.

---

## 🛠️ Contributing

Contributions are welcome!
Please open issues and submit pull requests to improve WordPlay.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
