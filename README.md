# 🎮 Campaign Chaos - AI-Powered Marketing Game

A fun, interactive game where you play as an international marketer fixing hilariously bad ad translations! The game now features AI-powered prompt generation and intelligent scoring.

## 🚀 Features

- **AI-Generated Prompts**: Each game session gets unique marketing challenges created by AI
- **Intelligent Scoring**: AI evaluates your slogans on humor, cultural fit, and creativity
- **Dynamic Feedback**: Get personalized feedback for each round and final results
- **Beautiful UI**: Modern, animated interface with spy file aesthetics
- **5 Rounds**: Complete challenges for different products and markets
- **Fun Titles**: Earn titles like "Future Global CMO" or "Lost in Translation, Literally"

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up OpenAI API:**
   - Get an API key from [OpenAI](https://platform.openai.com/api-keys)
   - Create a `.env` file in the root directory
   - Add your API key:
     ```
     VITE_OPENAI_API_KEY=your_actual_api_key_here
     ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:5173`

## 🎯 How to Play

1. Click "Start Campaign" to begin
2. Read the campaign briefing (product, market, problematic slogan)
3. Write a culturally-appropriate, engaging slogan
4. Submit and see your AI-powered score and feedback
5. Complete 5 rounds to get your final title and feedback

## 🤖 AI Features

- **Dynamic Prompts**: AI generates unique marketing scenarios for each game
- **Intelligent Scoring**: Evaluates humor, cultural sensitivity, and creativity
- **Personalized Feedback**: Get specific advice for improvement
- **Final Assessment**: Receive a witty summary of your marketing skills

## 🎨 Scoring System

Each slogan is scored (0-5) on:
- **Humor**: How funny, witty, or clever is your slogan?
- **Cultural Fit**: How well does it respect and appeal to the target culture?
- **Creativity**: How original and creative is your approach?

## 🛡️ Fallback System

If AI is unavailable, the game gracefully falls back to:
- Pre-written prompts
- Rule-based scoring
- Static feedback messages

## 📱 Responsive Design

The game works beautifully on desktop, tablet, and mobile devices.

## 🎉 Have Fun!

Test your international marketing skills and see if you have what it takes to be a Global CMO! 🌍✨
