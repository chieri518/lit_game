import React, { useState } from "react";
import { prompts } from "../data/prompts";
import { scoreAnswer } from "../utils/scoring";
import PromptCard from "./PromptCard";
import AnswerInput from "./AnswerInput";
import ScoreCard from "./ScoreCard";
import FinalScore from "./FinalScore";

function CampaignMode() {
  const [gameState, setGameState] = useState("start"); // "start", "playing", "scoring", "final"
  const [currentRound, setCurrentRound] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [currentScore, setCurrentScore] = useState({ humor: 0, fit: 0, creativity: 0 });
  const [totalScore, setTotalScore] = useState(0);
  const [roundScores, setRoundScores] = useState([]);

  const prompt = prompts[currentRound];

  const startGame = () => {
    setGameState("playing");
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    
    const newScore = scoreAnswer(userAnswer, prompt);
    setCurrentScore(newScore);
    setTotalScore(totalScore + newScore.humor + newScore.fit + newScore.creativity);
    setRoundScores([...roundScores, newScore]);
    setGameState("scoring");
  };

  const nextRound = () => {
    if (currentRound >= prompts.length - 1) {
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
  };

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
          </div>
          <button className="start-btn" onClick={startGame}>
            🚀 Start Campaign
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "playing") {
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
      />
    );
  }

  if (gameState === "final") {
    return (
      <FinalScore
        totalScore={totalScore}
        onRestart={restartGame}
      />
    );
  }

  return null;
}

export default CampaignMode;
