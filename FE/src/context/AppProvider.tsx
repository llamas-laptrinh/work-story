/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AppContext } from "./AppContext";
import Loader from "../components/Loader";

export default function AppProvider({ children }: any) {
  const [isLoading, setLoading] = React.useState(false);
  const values = React.useMemo(() => {
    return {
      isLoading,
      setLoading: (value: boolean) => setLoading(value),
    };
  }, [isLoading]);
  return (
    <AppContext.Provider value={values}>
      {isLoading && <Loader />}
      {children}
    </AppContext.Provider>
  );
}
