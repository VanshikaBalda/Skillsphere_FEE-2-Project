import { createContext, useContext, useEffect, useState } from "react";
import { initialData } from "./data/data";
import { loadData, saveData } from "./lib/storage";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [data, setData] = useState(initialData);
  const [loaded, setLoaded] = useState(false);

  // Load saved data when the app starts
  useEffect(() => {
    setData(loadData());
    setLoaded(true);
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (loaded) {
      saveData(data);
    }
  }, [data, loaded]);

  // Turn dark mode on or off
  useEffect(() => {
    if (data.profile.darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [data.profile.darkMode]);

  // Update application data
  function update(changes) {
    setData({ ...data, ...changes });
  }

  // Values that can be used by other components
  const value = {
    data,
    setData,
    update,
    resetData: () => setData(initialData),
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}