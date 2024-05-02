import { createContext } from "react";

export const AppContext = createContext<{
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}>({
  isLoading: false,
  setLoading: () => {},
});
