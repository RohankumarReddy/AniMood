import React from 'react';
import Button from './Button'; 
import moods from '../assets/Moods.js'; 

const Mood = ({ selectedGenres, toggleGenre }) => {
  return (
    <div className="text-center px-4 sm:px-6 md:px-10 lg:px-20 rounded-lg bg-slate-100/5">
      <h1 className="my-6 mx-auto leading-tight text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wide text-red-50 hover:text-pink-500 transition-all duration-300 ease-in-out inline-block transform hover:-translate-y-1 hover:scale-105 cursor-pointer">
        Explore the Anime's World Based on Your Mood! ✨
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto ">
        Discover new shows and characters that match your current feelings.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 mt-6">
        {Object.entries(moods).map(([mood, genre], index) => (
          <Button
            key={index}
            text={`${mood}`}
            onClick={() => toggleGenre(mood, genre)}
            className="w-full h-full py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center text-center leading-snug min-h-[60px] sm:min-h-[70px] md:min-h-[80px] lg:min-h-[90px]"
          />
        ))}
      </div>
    </div>
  );
};

export default Mood;