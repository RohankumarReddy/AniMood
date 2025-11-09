import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; 
import Mood from './Mood';
import ContentList from './ContentList';

const Contentcontainer = () => {
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [animeList, setAnimeList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hiddenAnime, setHiddenAnime] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAnimeContent, setShowAnimeContent] = useState(false);
  const [selectMood, setSelectMood] = useState("");
  const [trailer, setTrailer] = useState(null); // 🆕 Added

  // Fetch all genres once
  useEffect(() => {
    axios
      .get('https://api.jikan.moe/v4/genres/anime')
      .then((response) => {
        setAllGenres(response.data.data);
      })
      .catch((err) => {
        console.error('Error fetching all genres:', err);
      });
  }, []);

  // Fetch anime list when genres or page changes
  useEffect(() => {
    if (selectedGenres.length === 0) {
      setAnimeList([]);
      return;
    }
    setError(null);
    setLoading(true);

    const genreIds = selectedGenres.filter((g) => typeof g === 'number').join(",");

    axios
      .get("https://api.jikan.moe/v4/anime", {
        params: {
          order_by: "popularity",
          sort: "asc",
          min_score: 6,
          page,
          unapproved: false,
          ...(selectedGenres.includes("Highrated anime this year")
            ? {
                start_date: `${new Date().getFullYear()}-01-01`,
                end_date: `${new Date().getFullYear()}-12-31`,
                order_by: "score",
                sort: "desc",
                min_score: 7,
              }
            : {}),
          ...(genreIds ? { genres: genreIds } : {}),
        },
      })
      .then((response) => {
        if (selectedGenres.includes("Highrated anime this year") && response.data.data.length === 0) {
          return axios.get("https://api.jikan.moe/v4/anime", {
            params: {
              start_date: `${new Date().getFullYear() - 20}-01-01`,
              end_date: `${new Date().getFullYear()}-12-31`,
              order_by: "score",
              sort: "desc",
              min_score: 7,
              page,
            },
          });
        }
        return response;
      })
      .then((response) => {
        setAnimeList(response.data.data);
        setCurrentIndex(0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching content:", err);
        setError(err);
        setLoading(false);
      });
  }, [page, selectedGenres]);

  // 🆕 Fetch trailer for the current anime
  useEffect(() => {
    if (!animeList.length) return;
    const currentAnime = animeList[currentIndex];
    if (!currentAnime) return;

    axios
      .get(`https://api.jikan.moe/v4/anime/${currentAnime.mal_id}`)
      .then((res) => {
        setTrailer(res.data.data.trailer);
        // Merge trailer info into current anime object
        setAnimeList((prev) =>
          prev.map((a) =>
            a.mal_id === currentAnime.mal_id
              ? { ...a, trailer: res.data.data.trailer }
              : a
          )
        );
      })
      .catch((err) => console.error("Error fetching trailer:", err));
  }, [currentIndex, animeList]);

  const toggleGenre = (moodName, genreName) => {
    if (genreName === "Highrated anime this year") {
      setSelectedGenres(["Highrated anime this year"]);
    } else {
      const genreId = allGenres.find((g) => g.name === genreName)?.mal_id;
      if (genreId) {
        setSelectedGenres((prev) =>
          prev.includes(genreId)
            ? prev.filter((id) => id !== genreId)
            : [...prev, genreId]
        );
      }
    }
    setPage(1);
    setShowAnimeContent(true);
    setSelectMood(moodName);
  };

  const handleBackClick = () => {
    setShowAnimeContent(false);
    setSelectMood("");
    setPage(1);
    setSelectedGenres([]);
    setAnimeList([]);
    setHiddenAnime([]);
  };

  const visibleAnime = animeList.filter(
    (anime) => !hiddenAnime.includes(anime.mal_id)
  );

  const handleNextAnime = () => {
    if (currentIndex < visibleAnime.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setPage((prev) => prev + 1); 
    }
  };

  const handlePreviousAnime = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleHide = (animeIdToHide) => {
    setHiddenAnime((prev) => [...prev, animeIdToHide]);
    if (currentIndex >= visibleAnime.length - 1) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const currentAnime = visibleAnime[currentIndex];

  return (
    <div>
      <Navbar handleBackClick={handleBackClick} selectMood={selectMood} />
      {!showAnimeContent && (
        <Mood selectedGenres={selectedGenres} toggleGenre={toggleGenre} />
      )}
      {showAnimeContent && (
        <ContentList
          anime={currentAnime}
          loading={loading}
          error={error}
          handlePreviousAnime={handlePreviousAnime}
          handleNextAnime={handleNextAnime}
          handleHide={handleHide}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < visibleAnime.length - 1 || animeList.length > 0}
        />
      )}
    </div>
  );
};

export default Contentcontainer;
