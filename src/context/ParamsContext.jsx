import React, { createContext, useState } from "react";

export const ParamsContext = createContext(null);

export const ParamsProvider = ({ children }) => {
  const [params, setParams] = useState({});

  const updateParams = (newParams) => {
    setParams(newParams);
  };

  return (
    <ParamsContext.Provider value={{ params, updateParams }}>
      {children}
    </ParamsContext.Provider>
  );
};
