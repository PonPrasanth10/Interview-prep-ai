import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/interviewprep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group">
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3">
          <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">
            Q
          </span>
          <h3
            className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex gap-2 ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            {/* Improved Pin Button */}
            <button
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                isPinned 
                  ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } transition-colors`}
              onClick={onTogglePin}
              aria-label={isPinned ? "Unpin question" : "Pin question"}
            >
              {isPinned ? (
                <LuPinOff className="text-sm" />
              ) : (
                <LuPin className="text-sm" />
              )}
            </button>

            {/* Improved Learn More Button */}
            <button
              className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 transition-colors"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles className="text-sm" />
              <span className="hidden md:inline">Learn More</span>
            </button>
          </div>
          
          {/* Chevron Button */}
          <button
            className="text-gray-400 hover:text-gray-600 ml-2 transition-colors"
            onClick={toggleExpand}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;