import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);
    setSuccess(false);

    try {
      // Generate questions from AI
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: role.trim(),
          experience: experience.trim(),
          topicsToFocus: topicsToFocus.trim(),
          numberOfQuestions: 10,
        }
      );

      // Validate AI response
      if (!aiResponse.data?.success) {
        throw new Error(
          aiResponse.data?.message || "Failed to generate questions"
        );
      }

      const generatedQuestions = Array.isArray(aiResponse.data?.questions)
        ? aiResponse.data.questions
        : [];

      if (generatedQuestions.length === 0) {
        throw new Error("No questions were generated");
      }
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create session with the questions
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });
      console.log("Full response:", {
        status: response.status,
        headers: response.headers,
        data: response.data,
        config: response.config,
      });
      if (!response.data?.session?._id) {
        throw new Error(
          response.data?.message || "Session creation failed. Please try again."
        );
      }

      setSuccess(true);

      // Handle success callback if provided
      if (onSuccess) {
        onSuccess(response.data);
      }

      if (!response.data?.session?._id) {
        throw new Error(
          response.data?.message || "Session creation failed. Please try again."
        );
      }
       if (response.data?.session?._id){

         navigate(`/interview-prep/${response.data?.session?._id}`, {
           replace: true,
           state: {
             newSession: true,
             sessionData: response.data,
           },
         });
       }
      // Navigate to the new session
    } catch (err) {
      console.error("Session creation error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto p-8 bg-white rounded-lg shadow-md min-h-[calc(100vh-100px)] flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Start a New Interview Journey
      </h2>
      <p className="text-gray-600 mb-6">
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Session created successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleCreateSession} className="flex-grow">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Target Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Years of Experience <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            placeholder="(e.g., 1 year, 3 years, 5+ years)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Topics to Focus On <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.topicsToFocus}
            onChange={(e) => handleChange("topicsToFocus", e.target.value)}
            placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="(Any specific goals or notes for this session)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-auto"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            </span>
          ) : (
            "Create Session"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
