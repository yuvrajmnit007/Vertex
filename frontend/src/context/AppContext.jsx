import { createContext, useContext } from "react";
import { useUser } from "@clerk/clerk-react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useUser();

  // You can add any other global states or functions here later
  const favoriteMovies = [];

  const value = {
    user,
    favoriteMovies,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};