import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/cards/QuestionCard";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import AIResponsePreview from "./components/AIResponsePreview";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isSessionLoading, setIsSessionLoading] = useState(false);
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);

  const fetchSessionDetailsById = async () => {
    setIsSessionLoading(true);
    setErrorMsg("");
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.SESSION.GET_ONE(sessionId)}?page=1`
      );
      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSessionLoading(false);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsExplanationLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data?.Explanation) {
        setExplanation({
          title: response.data.Explanation.title,
          explanation: response.data.Explanation.explanation,
        });
      }
    } catch (error) {
      setErrorMsg("Failed to generate explanation. Try again later.");
      console.error("Error:", error);
    } finally {
      setIsExplanationLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      if (response.data?.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-6 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h1 className="text-3xl font-bold text-blue-700 mb-3 md:mb-0">
            {sessionData?.role || "Interview"} Preparation
          </h1>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              Experience: {sessionData?.experience || "-"}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {sessionData?.questions?.length || "0"} Q&A
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              Last Updated:{" "}
              {sessionData?.updatedAt
                ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                : "-"}
            </span>
          </div>
        </div>

        {/* Topics Section */}
        {sessionData?.topicsToFocus && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              Skills/Topics
            </h2>
            <div className="flex flex-wrap gap-3">
              {sessionData.topicsToFocus.split(",").map((topic, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {topic.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Questions Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-300">
            Interview Questions
          </h2>

          <div className={`${openLearnMoreDrawer ? "md:pr-4" : ""}`}>
            <AnimatePresence>
              {isSessionLoading ? (
                <div className="flex justify-center py-12">
                  <SkeletonLoader />
                </div>
              ) : (
                sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}
                    className="mb-6"
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Explanation Drawer */}
        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={explanation?.title || "Concept Explanation"}
          isLoading={isExplanationLoading}
        >
          {errorMsg && (
            <p className="flex gap-2 text-sm text-red-600 font-medium">
              <LuCircleAlert className="mt-1" />
              {errorMsg}
            </p>
          )}
          {!isExplanationLoading && explanation && (
            <AIResponsePreview content={explanation.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
