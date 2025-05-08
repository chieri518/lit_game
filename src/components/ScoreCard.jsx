import React from "react";

function ScoreCard({ score }) {
  return (
    <div className="score-card">
      <h2>Game Over!</h2>
      <p>
        Total Score: <strong>{score}</strong>
      </p>
      <p>Thanks for playing Lost in Translation: Marketing Mayhem!</p>
    </div>
  );
}

export default ScoreCard;
