import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

// Generate a new marketing campaign prompt
export const generatePrompt = async () => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a creative marketing expert who creates challenging scenarios for international marketing campaigns. 
          Generate a marketing prompt with:
          - A product (with emoji)
          - A target market (with flag emoji)
          - A problematic or culturally inappropriate slogan
          - Context explaining why the slogan is problematic
          
          Make it funny, realistic, and educational. Return as JSON:
          {
            "product": "Product with emoji",
            "market": "Country with flag emoji", 
            "badSlogan": "The problematic slogan",
            "context": "Why this slogan is problematic"
          }`
        },
        {
          role: "user",
          content: "Generate a new marketing campaign prompt"
        }
      ],
      temperature: 0.8,
      max_tokens: 300
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating prompt:', error);
    // Fallback to static prompts if AI fails
    return getFallbackPrompt();
  }
};

// AI-powered scoring system
export const scoreAnswerWithAI = async (userAnswer, prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert international marketing consultant evaluating creative slogans. 
          Score the user's answer on a scale of 0-5 for each category:
          
          HUMOR (0-5): How funny, witty, or clever is the slogan?
          CULTURAL FIT (0-5): How well does it respect and appeal to the target culture?
          CREATIVITY (0-5): How original and creative is the approach?
          
          Provide specific feedback for each category and an overall comment.
          Return as JSON:
          {
            "humor": number,
            "fit": number, 
            "creativity": number,
            "feedback": {
              "humor": "specific feedback",
              "fit": "specific feedback",
              "creativity": "specific feedback"
            },
            "overall": "overall comment"
          }`
        },
        {
          role: "user",
          content: `Product: ${prompt.product}
          Target Market: ${prompt.market}
          Original Problematic Slogan: "${prompt.badSlogan}"
          Context: ${prompt.context}
          
          User's New Slogan: "${userAnswer}"
          
          Please score and provide feedback.`
        }
      ],
      temperature: 0.7,
      max_tokens: 400
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Error scoring with AI:', error);
    // Fallback to rule-based scoring
    return scoreAnswerFallback(userAnswer, prompt);
  }
};

// Generate AI feedback for the final score
export const generateFinalFeedback = async (totalScore, roundScores) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a witty marketing expert giving final feedback to a player who just completed a marketing campaign game.
          The player scored ${totalScore}/75 points across 5 rounds.
          
          Generate:
          1. A funny, creative job title based on their performance
          2. A humorous but encouraging message
          3. Specific advice for improvement
          
          Be entertaining and use emojis. Keep it concise and fun.`
        },
        {
          role: "user",
          content: "Give me final feedback for this marketing campaign game player."
        }
      ],
      temperature: 0.9,
      max_tokens: 200
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating final feedback:', error);
    return getFallbackFinalFeedback(totalScore);
  }
};

// Fallback functions when AI is not available
const getFallbackPrompt = () => {
  const fallbackPrompts = [
    {
      product: "🍕 Pizza",
      market: "🇮🇹 Italy", 
      badSlogan: "Better than your grandmother's recipe!",
      context: "Insulting to Italian family traditions and nonna's cooking."
    },
    {
      product: "🚗 Car",
      market: "🇧🇷 Brazil",
      badSlogan: "This car will make you rich!",
      context: "Overpromising and culturally insensitive in Brazil."
    },
    {
      product: "💄 Lipstick",
      market: "🇰🇷 South Korea", 
      badSlogan: "Make men notice you!",
      context: "Outdated and sexist approach that doesn't resonate with modern Korean women."
    }
  ];
  
  return fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)];
};

const scoreAnswerFallback = (userAnswer, prompt) => {
  // Use the existing rule-based scoring as fallback
  const answerLower = userAnswer.toLowerCase();
  
  let humor = Math.floor(Math.random() * 3) + 2;
  let fit = Math.floor(Math.random() * 3) + 2;
  let creativity = Math.floor(Math.random() * 3) + 2;
  
  return {
    humor,
    fit,
    creativity,
    feedback: {
      humor: "Good attempt at humor!",
      fit: "Nice cultural awareness!",
      creativity: "Creative approach!"
    },
    overall: "Solid work! Keep practicing your international marketing skills."
  };
};

const getFallbackFinalFeedback = (totalScore) => {
  if (totalScore >= 60) return "🌟 Future Global CMO - You're a marketing genius!";
  if (totalScore >= 45) return "🎯 Cultural Sensitivity Expert - Great work!";
  if (totalScore >= 30) return "🤝 Lost in Translation, But Learning - Not bad!";
  return "😅 Lost in Translation, Literally - Keep practicing!";
}; 