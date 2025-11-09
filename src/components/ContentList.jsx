import React from "react";
import Button from "./Button";

const ContentList = ({
  anime,
  loading,
  error,
  handleNextAnime,
  handlePreviousAnime,
  handleHide,
  hasNext,
  hasPrevious,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-5 p-10 items-center justify-center">
        ✨ Finding your next favorite anime...
        <span className="ml-3">
          <svg
            className="animate-spin h-5 w-5 text-pink-600"
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
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        ❌ Error loading anime. Please try again.
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="text-center p-10">
        <p>No more anime to show for this selection.</p>
        <div className="mt-4">
          <Button onClick={handleNextAnime} text={"Try Next Page ➡️"} />
        </div>
      </div>
    );
  }

  // ✅ Fix: Use embed_url if youtube_id is missing
  const trailerUrl =
    anime.trailer?.embed_url ||
    (anime.trailer?.youtube_id
      ? `https://www.youtube.com/embed/${anime.trailer.youtube_id}`
      : "");

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-3xl rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 backdrop-blur-md">
        <figure className="px-6 pt-6 aspect-[16/9]">
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md bg-black">
            {trailerUrl ? (
              <iframe
                src={trailerUrl}
                title={anime.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Trailer Not Available
              </div>
            )}
          </div>
        </figure>

        <div className="card-body text-left px-6">
          <h2 className="card-title font-sakura text-white hover:text-pink-400 transition-colors duration-300 ease-in-out drop-shadow-sm text-xl sm:text-2xl">
            {anime.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-1">
            <span className="font-semibold text-red-400">
              {anime.year || "N/A"}
            </span>{" "}
            · {anime.episodes || "?"} ep · ⭐ {anime.score || "N/A"} ·{" "}
            {anime.rank ? `Top ${anime.rank}` : ""} 🏆
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {anime.genres.map((genre) => (
              <div
                key={genre.mal_id}
                className="badge badge-outline badge-accent hover:text-white transition-colors duration-200"
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>

        <div className="card-actions flex justify-between px-10 pb-6 gap-4 sm:gap-8 ">
          <Button
            onClick={handlePreviousAnime}
            text={"⬅️ Previous"}
            className="flex-1"
            disabled={!hasPrevious}
          />
          <Button
            onClick={() => handleHide(anime.mal_id)}
            text={"🚫 Hide"}
            className="flex-1"
          />
          <Button
            onClick={handleNextAnime}
            text={hasNext ? "Next ➡️" : "Next Page ➡️"}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentList;
