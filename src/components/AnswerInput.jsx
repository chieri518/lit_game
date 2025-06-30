import React from "react";

function AnswerInput({ answer, setAnswer, handleSubmit, isLoading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="answer-input">
      <div className="input-header">
        <h4>💡 Your Brilliant Slogan:</h4>
        <span className="char-count">{answer.length}/200</span>
      </div>
      
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Write your culturally-appropriate, engaging slogan here... (Ctrl+Enter to submit)"
        rows={4}
        maxLength={200}
        className="slogan-textarea"
        disabled={isLoading}
      />
      
      <div className="input-actions">
        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={!answer.trim() || isLoading}
        >
          {isLoading ? "🤖 AI is analyzing..." : "🚀 Submit Campaign"}
        </button>
        <p className="hint">
          {isLoading 
            ? "🤖 AI is evaluating your marketing genius..." 
            : "💡 Tip: Consider cultural values, humor, and creativity!"
          }
        </p>
      </div>
    </div>
  );
}

export default AnswerInput;
