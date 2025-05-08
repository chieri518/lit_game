import React from "react";

function AnswerInput({ answer, setAnswer, handleSubmit }) {
  return (
    <div className="answer-input">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your localized slogan here..."
        rows={4}
        style={{ width: "100%", padding: "8px" }}
      />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit
      </button>
    </div>
  );
}

export default AnswerInput;
