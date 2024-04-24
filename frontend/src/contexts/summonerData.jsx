import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, Route, Routes } from 'react-router-dom';
import axios from 'axios';

const SummonerDataContext = createContext();

export const SummonerDataProvider = ({ children }) => {
  const [summonerData, setSummonerData] = useState(null);

  return (
      <SummonerDataContext.Provider value={{ summonerData, setSummonerData }}>
          {children}
      </SummonerDataContext.Provider>
  );
};

export const useSummonerData = () => {
  const summonerData = useContext(SummonerDataContext);
  return summonerData;
};