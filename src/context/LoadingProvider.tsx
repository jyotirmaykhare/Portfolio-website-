import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { PropsWithChildren } from "react";
import Loading from "./Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  // Drive the counter to 100% reliably on every route so the loader always
  // completes (on the home page the 3D scene adds its own progress after).
  // Tuned to be snappy (~2.5–3s) so the boot screen never outlives the
  // real asset work happening behind it.
  useEffect(() => {
    let percent = 0;
    const interval = setInterval(() => {
      if (percent <= 70) {
        percent += Math.round(Math.random() * 3 + 2);
      } else {
        percent += Math.round(Math.random() * 4 + 2);
      }
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
      }
      setLoading(percent);
    }, 90);
    return () => clearInterval(interval);
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};