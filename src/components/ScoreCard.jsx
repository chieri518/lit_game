import React from "react";
import { getFeedback } from "../utils/scoring";

function ScoreCard({ scores, round, onNextRound }) {
  const { humor, fit, creativity } = scores;
  const total = humor + fit + creativity;
  const feedback = getFeedback(scores);

  return (
    <div className="score-card">
      <div className="score-header">
        <h3>🎯 ROUND {round + 1} RESULTS</h3>
      </div>
      
      <div className="score-breakdown">
        <div className="score-item">
          <span className="score-label">🎭 Humor:</span>
          <div className="score-bar">
            <div className="score-fill" style={{ width: `${(humor / 5) * 100}%` }}></div>
            <span className="score-value">{humor}/5</span>
          </div>
        </div>
        
        <div className="score-item">
          <span className="score-label">🌍 Cultural Fit:</span>
          <div className="score-bar">
            <div className="score-fill" style={{ width: `${(fit / 5) * 100}%` }}></div>
            <span className="score-value">{fit}/5</span>
          </div>
        </div>
        
        <div className="score-item">
          <span className="score-label">✨ Creativity:</span>
          <div className="score-bar">
            <div className="score-fill" style={{ width: `${(creativity / 5) * 100}%` }}></div>
            <span className="score-value">{creativity}/5</span>
          </div>
        </div>
      </div>
      
      <div className="total-score">
        <h4>Round Total: {total}/15</h4>
      </div>
      
      <div className="feedback">
        <h4>💬 Feedback:</h4>
        <ul>
          {feedback.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
      <button className="next-round-btn" onClick={onNextRound}>
        {round < 4 ? "Next Campaign →" : "See Final Results"}
      </button>
    </div>
  );
}

export default ScoreCard;
