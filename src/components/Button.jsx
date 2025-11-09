import React from "react";

const Button = ({ onClick, isdisabled, className, text }) => {
  return (
    <button
      className={`w-full 
        px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 lg:px-6 lg:py-5
        rounded-xl 
        bg-gradient-to-r from-pink-600 via-red-500 to-pink-700 
        border border-white/20 backdrop-blur-sm 
        shadow-md hover:shadow-xl 
        hover:scale-105 hover:from-red-500 hover:to-pink-600 
        active:scale-95 active:shadow-md 
        transition-all duration-300 ease-in-out 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
      onClick={onClick}
      disabled={isdisabled}
    >
      <span
        className="text-white drop-shadow-md font-sakura
        text-xs sm:text-sm md:text-base lg:text-lg 
        font-bold tracking-wide 
        hover:text-yellow-200 transition-colors duration-300 ease-in-out"
      >
        {text}
      </span>
    </button>
  );
};

export default Button;
