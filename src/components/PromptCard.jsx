import React from "react";

function PromptCard({ prompt, round }) {
  return (
    <div className="prompt-card">
      <div className="campaign-briefing">
        <div className="briefing-header">
          <h3>🎯 CAMPAIGN BRIEFING #{round + 1}</h3>
          <div className="classified-stamp">CLASSIFIED</div>
        </div>
        
        <div className="briefing-content">
          <div className="product-info">
            <span className="label">🧴 Product:</span>
            <span className="value">{prompt.product}</span>
          </div>
          
          <div className="market-info">
            <span className="label">🌍 Target Market:</span>
            <span className="value">{prompt.market}</span>
          </div>
          
          <div className="original-slogan">
            <span className="label">💬 Original Slogan:</span>
            <div className="slogan-box">
              <em>"{prompt.badSlogan}"</em>
            </div>
          </div>
          
          <div className="context-info">
            <span className="label">⚠️ The Problem:</span>
            <p>{prompt.context}</p>
          </div>
          
          <div className="mission">
            <h4>🎯 YOUR MISSION</h4>
            <p>Create a culturally-appropriate, engaging slogan that would actually work in this market!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptCard;
