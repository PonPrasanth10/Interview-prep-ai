import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children, isLoading }) => {
  return (
    <div
      className={`
        fixed top-0 right-0 z-[48] 
        h-screen w-full md:w-[40vw]
        transition-transform bg-white 
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        flex flex-col
      `}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      <div className="flex-shrink-0 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h5 
            id="drawer-right-label" 
            className="text-base font-semibold text-gray-900"
          >
            {title}
          </h5>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center"
          >
            <LuX className="text-lg" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            Loading...
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Drawer;
