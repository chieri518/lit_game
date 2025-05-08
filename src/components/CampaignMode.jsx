import React, { useState } from "react";
import { prompts } from "../data/prompts";
import AnswerInput from "./AnswerInput";
import ScoreCard from "./ScoreCard";
import { scoreAnswer } from "../utils/scoring";

function CampaignMode() {
  const [currentRound, setCurrentRound] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState({ humor: 0, fit: 0, creativity: 0 });
  const [totalScore, setTotalScore] = useState(0);

  const prompt = prompts[currentRound];

  const handleSubmit = () => {
    const newScore = scoreAnswer(userAnswer);
    setScore(newScore);
    setTotalScore(
      totalScore + newScore.humor + newScore.fit + newScore.creativity
    );
    setUserAnswer("");
    setCurrentRound(currentRound + 1);
  };

  if (currentRound >= prompts.length) {
    return <ScoreCard score={totalScore} />;
  }

  return (
    <div className="campaign-mode">
      <h2>Round {currentRound + 1}</h2>
      <p>
        <strong>Product:</strong> {prompt.product}
      </p>
      <p>
        <strong>Market:</strong> {prompt.market}
      </p>
      <p>
        <strong>Original Slogan:</strong> {prompt.badSlogan}
      </p>
      <AnswerInput
        answer={userAnswer}
        setAnswer={setUserAnswer}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default CampaignMode;
