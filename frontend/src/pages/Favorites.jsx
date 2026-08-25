import BlurCircle from "../components/BlurCircle";
import MovieCard from "../components/MovieCard";
import { useAppContext } from "../context/AppContext";

const Favorites = () => {
  const { shows } = useAppContext();

  if (!shows || shows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-center text-gray-400">No movies available</h1>
      </div>
    );
  }

  return (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0" />
      <BlurCircle bottom="50px" right="50px" />
      
      <h1 className="text-xl font-semibold my-6">Your Favorite Movies</h1>
      
      <div className="flex flex-wrap max-sm:justify-center gap-6">
        {shows.map((movie) => (
          <MovieCard movie={movie} key={movie._id || movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;