const { GoogleGenAI } = require("@google/genai"); // Fixed typo in class name
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); // Fixed typo in env var

// @desc    Generate interview questions and answers using GenAI
// @route   POST /api/ai/generate-questions
// @access  Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const prompt = questionAnswerPrompt({
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
    });
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid prompt generated",
        generatedPrompt: prompt, // Include for debugging
      });
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt, // This is the correct field name
            },
          ],
        },
      ],
    });

    let rawText = response.text;
    // Clean the AI response text
    const cleanedText = rawText
      .replace(/^```(json)?/, "") // Remove starting ```json or ```
      .replace(/```$/, "") // Remove ending ```
      .replace(/^[^{[]*/, "") // Remove any non-JSON prefix
      .replace(/[^}\]]*$/, "") // Remove any non-JSON suffix
      .trim();

    // Parse the cleaned JSON
    const data = JSON.parse(cleanedText);

    res.status(200).json({
      success: true,
      questions: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc    Explain an interview concept
// @route   POST /api/ai/generate-explanation
// @access  Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(AMO).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt, // This is the correct field name
            },
          ],
        },
      ],
    });

    let rawText = response.text;
    // Clean the AI response text
    const cleanedText = rawText
      .replace(/^```(json)?/, "") // Remove starting ```json or ```
      .replace(/```$/, "") // Remove ending ```
      .replace(/^[^{[]*/, "") // Remove any non-JSON prefix
      .replace(/[^}\]]*$/, "") // Remove any non-JSON suffix
      .trim();

    // Parse the cleaned JSON
    const data = JSON.parse(cleanedText);

    res.status(200).json({
      success: true,
      Explanation: data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate conecpt explanations",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
