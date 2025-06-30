import React, { useState, useEffect } from "react";
// import { generatePrompt, scoreAnswerWithAI, generateFinalFeedback } from "../utils/aiService";
import PromptCard from "./PromptCard";
import AnswerInput from "./AnswerInput";
import ScoreCard from "./ScoreCard";
import FinalScore from "./FinalScore";

function CampaignMode() {
  console.log("CampaignMode component is loading...");
  
  const [gameState, setGameState] = useState("start"); // "start", "loading", "playing", "scoring", "final"
  const [currentRound, setCurrentRound] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentScore, setCurrentScore] = useState({ humor: 0, fit: 0, creativity: 0 });
  const [totalScore, setTotalScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [useAI, setUseAI] = useState(false);

  // Check if OpenAI API key is available
  useEffect(() => {
    console.log("Checking for API key...");
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("API key found:", apiKey ? "Yes" : "No");
    setUseAI(false); // Temporarily disable AI
  }, []);

  // Generate AI prompts when game starts
  useEffect(() => {
    if (gameState === "loading") {
      // Use static prompts immediately
      setPrompts(getStaticPrompts());
      setGameState("playing");
    }
  }, [gameState]);

  const getStaticPrompts = () => [
    {
      product: "🧴 Body Lotion",
      market: "🇯🇵 Japan",
      badSlogan: "Touch yourself more often.",
      context: "This slogan was a direct translation that sounded inappropriate in Japanese culture."
    },
    {
      product: "🍺 Beer",
      market: "🇩🇪 Germany",
      badSlogan: "It's time to get drunk!",
      context: "Too aggressive and inappropriate for German beer culture."
    },
    {
      product: "🚗 Car",
      market: "🇧🇷 Brazil",
      badSlogan: "This car will make you rich!",
      context: "Overpromising and culturally insensitive in Brazil."
    },
    {
      product: "🍕 Pizza",
      market: "🇮🇹 Italy",
      badSlogan: "Better than your grandmother's recipe!",
      context: "Insulting to Italian family traditions and nonna's cooking."
    },
    {
      product: "💄 Lipstick",
      market: "🇰🇷 South Korea",
      badSlogan: "Make men notice you!",
      context: "Outdated and sexist approach that doesn't resonate with modern Korean women."
    }
  ];

  const startGame = () => {
    console.log("Starting game...");
    setGameState("loading");
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return;
    
    setIsLoading(true);
    try {
      const prompt = prompts[currentRound];
      
      // Use fallback scoring
      const fallbackScore = scoreAnswerFallback(userAnswer, prompt);
      setCurrentScore(fallbackScore);
      setTotalScore(totalScore + fallbackScore.humor + fallbackScore.fit + fallbackScore.creativity);
      setRoundScores([...roundScores, fallbackScore]);
      setAiFeedback("Great job! Keep practicing your international marketing skills!");
      
      setGameState("scoring");
    } catch (error) {
      console.error('Error scoring:', error);
      // Fallback to basic scoring
      const fallbackScore = {
        humor: Math.floor(Math.random() * 6),
        fit: Math.floor(Math.random() * 6),
        creativity: Math.floor(Math.random() * 6)
      };
      setCurrentScore(fallbackScore);
      setTotalScore(totalScore + fallbackScore.humor + fallbackScore.fit + fallbackScore.creativity);
      setRoundScores([...roundScores, fallbackScore]);
      setGameState("scoring");
    } finally {
      setIsLoading(false);
    }
  };

  const scoreAnswerFallback = (userAnswer, prompt) => {
    const answerLower = userAnswer.toLowerCase();
    
    // Simple scoring logic
    let humor = Math.floor(Math.random() * 3) + 2;
    let fit = Math.floor(Math.random() * 3) + 2;
    let creativity = Math.floor(Math.random() * 3) + 2;
    
    // Bonus for longer answers
    if (userAnswer.length > 30) {
      creativity += 1;
    }
    
    // Bonus for cultural keywords
    const market = prompt.market.toLowerCase();
    if (market.includes('japan') && answerLower.includes('gentle')) fit += 1;
    if (market.includes('germany') && answerLower.includes('quality')) fit += 1;
    if (market.includes('brazil') && answerLower.includes('passion')) fit += 1;
    
    return {
      humor: Math.min(5, humor),
      fit: Math.min(5, fit),
      creativity: Math.min(5, creativity),
      feedback: {
        humor: "Good attempt at humor!",
        fit: "Nice cultural awareness!",
        creativity: "Creative approach!"
      },
      overall: "Solid work! Keep practicing your international marketing skills."
    };
  };

  const nextRound = async () => {
    if (currentRound >= prompts.length - 1) {
      // Generate final feedback
      setAiFeedback(getFallbackFinalFeedback(totalScore));
      setGameState("final");
    } else {
      setCurrentRound(currentRound + 1);
      setUserAnswer("");
      setGameState("playing");
    }
  };

  const restartGame = () => {
    setGameState("start");
    setCurrentRound(0);
    setUserAnswer("");
    setCurrentScore({ humor: 0, fit: 0, creativity: 0 });
    setTotalScore(0);
    setRoundScores([]);
    setPrompts([]);
    setAiFeedback("");
  };

  const getFallbackFinalFeedback = (score) => {
    if (score >= 60) return "🌟 Future Global CMO - You're a marketing genius!";
    if (score >= 45) return "🎯 Cultural Sensitivity Expert - Great work!";
    if (score >= 30) return "🤝 Lost in Translation, But Learning - Not bad!";
    return "😅 Lost in Translation, Literally - Keep practicing!";
  };

  console.log("Current game state:", gameState);

  if (gameState === "start") {
    return (
      <div className="campaign-start">
        <div className="start-screen">
          <h2>🎮 Campaign Chaos</h2>
          <div className="game-description">
            <p>You're a lone international marketer tasked with fixing hilariously bad ad translations!</p>
            <p>Create brilliant localized versions for fictional brands and earn points based on:</p>
            <ul>
              <li>🎭 Humor</li>
              <li>🌍 Cultural Fit</li>
              <li>✨ Creativity</li>
            </ul>
            <p>Complete 5 rounds and see if you have what it takes to be a Global CMO!</p>
            
            <div className="demo-mode">
              <p>🎮 <strong>Demo Mode:</strong> Playing with pre-written prompts</p>
              <p className="setup-hint">💡 To enable AI features, add your OpenAI API key to a .env file</p>
            </div>
          </div>
          <button className="start-btn" onClick={startGame}>
            🚀 Start Campaign
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "loading" || isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <h3>🎮 Loading your campaign...</h3>
          <div className="loading-spinner"></div>
          <p>Preparing your marketing challenges!</p>
        </div>
      </div>
    );
  }

  if (gameState === "playing") {
    const prompt = prompts[currentRound];
    return (
      <div className="campaign-mode">
        <div className="game-header">
          <h2>Round {currentRound + 1} of 5</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentRound + 1) / 5) * 100}%` }}></div>
          </div>
        </div>
        
        <PromptCard prompt={prompt} round={currentRound} />
        
        <AnswerInput
          answer={userAnswer}
          setAnswer={setUserAnswer}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    );
  }

  if (gameState === "scoring") {
    return (
      <ScoreCard
        scores={currentScore}
        round={currentRound}
        onNextRound={nextRound}
        aiFeedback={aiFeedback}
      />
    );
  }

  if (gameState === "final") {
    return (
      <FinalScore
        totalScore={totalScore}
        onRestart={restartGame}
        aiFeedback={aiFeedback}
      />
    );
  }

  return null;
}

export default CampaignMode;
