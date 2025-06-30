export const scoreAnswer = (answer, prompt) => {
  const answerLower = answer.toLowerCase();
  
  // Humor scoring (0-5)
  let humor = 0;
  const humorKeywords = ['funny', 'hilarious', 'joke', 'laugh', 'witty', 'clever', 'pun', 'play'];
  const humorMatches = humorKeywords.filter(keyword => answerLower.includes(keyword)).length;
  humor = Math.min(5, Math.floor(Math.random() * 3) + humorMatches + (answer.length > 30 ? 1 : 0));
  
  // Cultural fit scoring (0-5)
  let fit = 0;
  const market = prompt.market.toLowerCase();
  
  if (market.includes('japan')) {
    const japanKeywords = ['gentle', 'respectful', 'harmony', 'beauty', 'elegant', 'refined', 'peaceful'];
    const japanMatches = japanKeywords.filter(keyword => answerLower.includes(keyword)).length;
    fit = Math.min(5, japanMatches + 2);
  } else if (market.includes('germany')) {
    const germanyKeywords = ['quality', 'precision', 'tradition', 'craft', 'excellence', 'reliable'];
    const germanyMatches = germanyKeywords.filter(keyword => answerLower.includes(keyword)).length;
    fit = Math.min(5, germanyMatches + 2);
  } else if (market.includes('brazil')) {
    const brazilKeywords = ['passion', 'energy', 'vibrant', 'colorful', 'freedom', 'joy', 'celebration'];
    const brazilMatches = brazilKeywords.filter(keyword => answerLower.includes(keyword)).length;
    fit = Math.min(5, brazilMatches + 2);
  } else if (market.includes('italy')) {
    const italyKeywords = ['family', 'tradition', 'authentic', 'passion', 'heritage', 'love', 'quality'];
    const italyMatches = italyKeywords.filter(keyword => answerLower.includes(keyword)).length;
    fit = Math.min(5, italyMatches + 2);
  } else if (market.includes('korea')) {
    const koreaKeywords = ['modern', 'trendy', 'confidence', 'empowerment', 'beauty', 'style', 'individual'];
    const koreaMatches = koreaKeywords.filter(keyword => answerLower.includes(keyword)).length;
    fit = Math.min(5, koreaMatches + 2);
  } else {
    fit = Math.floor(Math.random() * 3) + 2;
  }
  
  // Creativity scoring (0-5)
  let creativity = 0;
  const wordCount = answer.split(' ').length;
  const hasAlliteration = /(\b\w+)\s+\1/i.test(answer);
  const hasRhyme = /(\b\w+)\s+\w+\s+\1/i.test(answer);
  const hasMetaphor = answerLower.includes('like') || answerLower.includes('as') || answerLower.includes('is');
  
  creativity = Math.min(5, 
    (wordCount > 5 ? 1 : 0) + 
    (wordCount > 10 ? 1 : 0) + 
    (hasAlliteration ? 1 : 0) + 
    (hasRhyme ? 1 : 0) + 
    (hasMetaphor ? 1 : 0) + 
    (answer.length > 50 ? 1 : 0)
  );
  
  return { humor, fit, creativity };
};

export const getFeedback = (scores) => {
  const { humor, fit, creativity } = scores;
  const total = humor + fit + creativity;
  
  let feedback = [];
  
  if (humor >= 4) feedback.push("🎭 Hilarious! You've got the comedy chops!");
  else if (humor >= 2) feedback.push("😊 Nice attempt at humor!");
  else feedback.push("😐 Could use more wit and charm.");
  
  if (fit >= 4) feedback.push("🌍 Perfect cultural sensitivity!");
  else if (fit >= 2) feedback.push("🤝 Good cultural awareness!");
  else feedback.push("⚠️ Needs better cultural understanding.");
  
  if (creativity >= 4) feedback.push("✨ Brilliant creative thinking!");
  else if (creativity >= 2) feedback.push("💡 Creative approach!");
  else feedback.push("📝 Try thinking outside the box more.");
  
  return feedback;
}; 