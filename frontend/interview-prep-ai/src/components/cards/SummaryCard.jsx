import React from "react";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div 
      className="w-full rounded-xl p-6 shadow-md transition-all hover:shadow-lg cursor-pointer"
      style={{ background: colors?.bgcolor || '#f8fafc' }}
      onClick={onSelect}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{role}</h2>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-gray-400 hover:text-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {topicsToFocus?.split(',').map((topic, i) => (
            <span key={i} className="px-2 py-1 bg-white bg-opacity-30 rounded-full text-xs font-medium">
              {topic.trim()}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Experience</p>
            <p className="font-medium">{experience}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Questions</p>
            <p className="font-medium">{questions}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <p className="text-xs text-gray-500 mb-1">Last Updated {lastUpdated}</p>
          <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;