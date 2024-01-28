import React, { useState, createContext } from "react";
import Filter from "../Componentes/Filter";
import Fetch from "../Componentes/Fetch";

export const SearchContext = createContext();

function Principal() {
  const [apiData, setApiData] = useState(null);
  const [entradaUsuario, entradaElegida] = useState("");
  const [apiError, setApiError] = useState(null);
  const [regionEle, setRegionChoice] = useState("");

  return (
    <SearchContext.Provider
      value={{ entradaUsuario, entradaElegida, regionEle, setRegionChoice, apiData, setApiData, apiError, setApiError }}
    >
      <div className="home-page">
        <Filter />
        <Fetch />
      </div>
    </SearchContext.Provider>
  );
}

export default Principal;
