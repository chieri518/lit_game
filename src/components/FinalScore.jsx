import React from "react";

function FinalScore({ totalScore, onRestart }) {
  const getTitle = (score) => {
    if (score >= 60) return "🌟 Future Global CMO";
    if (score >= 45) return "🎯 Cultural Sensitivity Expert";
    if (score >= 30) return "🤝 Lost in Translation, But Learning";
    if (score >= 15) return "😅 Lost in Translation, Literally";
    return "💀 Fired from Marketing Department";
  };

  const getMessage = (score) => {
    if (score >= 60) return "You're a marketing genius! Companies worldwide are fighting for your expertise!";
    if (score >= 45) return "Great work! You've got a solid understanding of global marketing.";
    if (score >= 30) return "Not bad! With a bit more practice, you'll be unstoppable.";
    if (score >= 15) return "Well... at least you tried! Maybe stick to local campaigns for now.";
    return "Oh dear... Maybe marketing isn't your calling. Have you considered accounting?";
  };

  const title = getTitle(totalScore);
  const message = getMessage(totalScore);

  return (
    <div className="final-score">
      <div className="final-header">
        <h2>🎉 CAMPAIGN COMPLETE!</h2>
        <div className="title-badge">
          <h3>{title}</h3>
        </div>
      </div>
      
      <div className="final-stats">
        <div className="total-score-display">
          <h4>Final Score</h4>
          <div className="score-number">{totalScore}/75</div>
          <div className="score-percentage">{Math.round((totalScore / 75) * 100)}%</div>
        </div>
      </div>
      
      <div className="final-message">
        <p>{message}</p>
      </div>
      
      <div className="achievement">
        <h4>🏆 Achievement Unlocked:</h4>
        <p>{title}</p>
      </div>
      
      <div className="game-actions">
        <button className="restart-btn" onClick={onRestart}>
          🎮 Play Again
        </button>
        <p className="share-text">Share your marketing genius with friends!</p>
      </div>
    </div>
  );
}

export default FinalScore;
