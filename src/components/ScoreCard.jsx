import React from "react";

function ScoreCard({ scores, round, onNextRound, aiFeedback }) {
  const { humor, fit, creativity, feedback } = scores;
  const total = humor + fit + creativity;

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
      
      {feedback && (
        <div className="ai-feedback">
          <h4>🤖 AI Feedback:</h4>
          <div className="feedback-details">
            {feedback.humor && (
              <div className="feedback-item">
                <strong>Humor:</strong> {feedback.humor}
              </div>
            )}
            {feedback.fit && (
              <div className="feedback-item">
                <strong>Cultural Fit:</strong> {feedback.fit}
              </div>
            )}
            {feedback.creativity && (
              <div className="feedback-item">
                <strong>Creativity:</strong> {feedback.creativity}
              </div>
            )}
          </div>
          {aiFeedback && (
            <div className="overall-feedback">
              <strong>Overall:</strong> {aiFeedback}
            </div>
          )}
        </div>
      )}
      
      <button className="next-round-btn" onClick={onNextRound}>
        {round < 4 ? "Next Campaign →" : "See Final Results"}
      </button>
    </div>
  );
}

export default ScoreCard;
