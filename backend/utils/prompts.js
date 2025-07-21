const questionAnswerPrompt = ({ role, experience, topicsToFocus, numberOfQuestions }) => (`
You are an AI trained to generate technical interview questions and answers.

Task:
  - Role: ${role}
  - Candidate Experience: ${experience} years
  - Focus Topics: ${topicsToFocus}
  - Write ${numberOfQuestions} interview questions.
  - For each question, generate a detailed but beginner-friendly answer.
  - If the answer needs a code example, add a small code block inside.
  - Keep formatting very clean.
  - Return a pure JSON array like:
    [{
      "question": "Question here?",
      "answer": "Answer here."
    }]

Important: Do NOT add any extra text. Only return valid JSON.
`)
const conceptExplainPrompt = (question) => (`
You are an AI trained to generate explanations for a given interview question.

Task:
  - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
  - Question: "${question}"
  - After the explanation, provide a short and clear title that summarizes the concept.
  - If applicable, include a small code example in a code block.
  - Return the result as valid JSON in this exact format:
    {
      "title": "Concise title here",
      "explanation": "Detailed explanation here...",
      "codeExample": "// Optional code if needed"
    }

Important: Only return the JSON object with no additional text or formatting.
`)

module.exports = { conceptExplainPrompt,questionAnswerPrompt };