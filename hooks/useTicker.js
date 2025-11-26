import { useState } from "react";
import { createContext, useContext } from "react";

const TickerContext = createContext();

export function TickerProvider({ children }) {
  const [currentTicker, setCurrentTicker] = useState("AAPL");
  return (
    <TickerContext.Provider value={{ currentTicker, setCurrentTicker }}>
      {children}
    </TickerContext.Provider>
  );
}

export function useTicker() {
  const context = useContext(TickerContext);
  if (!context) {
    throw new Error("useTicker must be used within a TickerProvider");
  }
  return context;
}
