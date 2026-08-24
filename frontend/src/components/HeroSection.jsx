import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 2 Dummy trending events/movies data
const heroSlides = [
  {
    id: 1,
    bgImage: 'url("/backgroundImage.png")', // Swap with your actual image path or URL
    logo: assets.marvelLogo,
    title: "Guardians\nof the Galaxy",
    genre: "Action | Adventure | Sci-Fi",
    year: "2018",
    duration: "2h 8m",
    synopsis:
      "In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.",
    link: "/movies",
  },
  {
    id: 2,
    bgImage: 'url("/backgroundImage3.jpg")', // Ensure you have this or swap with another asset/url
    logo: assets.WarnerBros, 
    title: "Interstellar",
    genre: "Adventure | Drama | Sci-Fi",
    year: "2014",
    duration: "2h 49m",
    synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    link: "/movies",
  },
  {
    id: 3,
    bgImage: 'url("/backgroundImage2.jpg")', // Ensure you have this or swap with another asset/url
    logo: assets.marvelLogo, // You can use a different logo asset if available
    title: "Spider-Man",
    genre: "Action | Adventure | Sci-Fi",
    year: "2014",
    duration: "2h 22m",
    synopsis: "Peter Parker runs a web of secrets as he balances his high school life with his responsibilities as Spider-Man, while a new threat named Electro emerges in New York City.",
    link: "/movies",
  },
//   {
//     id: 4,
//     bgImage: 'url("/backgroundImage4.jpg")', // Ensure you have this or swap with another asset/url
//     logo: assets.marvelLogo, // You can use a different logo asset if available
//     title: "Avengers:\nSecret Wars",
//     genre: "Sci-Fi | Action | Thriller",
//     year: "2026",
//     duration: "2h 45m",
//     synopsis:
//       "The multiverse collapses into a singular chaotic reality. Earth's mightiest heroes must band together for the ultimate battle across dimensions.",
//     link: "/movies",
//   },
  {
    id: 5,
    bgImage: 'url("/backgroundImage5.jpg")', // Ensure you have this or swap with another asset/url
    logo: assets.Prime, // You can use a different logo asset if available
    title: "Hanuman",
    genre: "Action | Drama | Fantasy",
    year: "2024",
    duration: "2h 38m",
    synopsis: "Set against a backdrop of stormy skies and epic landscapes, an immortal divine deity sits in deep meditation, embodying supreme strength, devotion, and cosmic resilience.",link: "/movies",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Optional: Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div
      className="relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen transition-all duration-700"
      style={{ backgroundImage: currentSlide.bgImage }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content wrapper to stay above overlay */}
      <div className="relative z-10 flex flex-col items-start gap-4 max-w-2xl">
        <img
          src={currentSlide.logo}
          alt="movie-logo"
          className="max-h-11 lg:h-11 mt-20"
        />

        <h1 className="text-5xl md:text-[70px] md:leading-18 font-semibold whitespace-pre-line">
          {currentSlide.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-300 text-sm md:text-base">
          <span>{currentSlide.genre}</span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4.5 h-4.5" /> {currentSlide.year}
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4.5 h-4.5" /> {currentSlide.duration}
          </div>
        </div>

        <p className="max-w-md text-gray-300 text-sm md:text-base">
          {currentSlide.synopsis}
        </p>

        <button
          onClick={() => navigate(currentSlide.link)}
          className="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
        >
          Explore Movies
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Carousel Navigation Controls (Arrows & Dots) */}
      <div className="absolute bottom-8 right-6 md:right-16 lg:right-36 z-10 flex items-center gap-4">
        {/* Indicators */}
        <div className="flex items-center gap-2 mr-2">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? "w-8 bg-primary" : "w-2 bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Left/Right Buttons */}
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-gray-700 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white border border-gray-700 transition cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;