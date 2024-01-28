import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Componentes/Navbar";
import Principal from "./web/Principal";
import PaginaPais from "./web/PaginaPais";
import NotFound from "./web/NotFound";
import AOS from "aos";
import "./App.css";
import "aos/dist/aos.css";

export const SearchContext = createContext();

function App() {
  const [paisesBuscados, setPaisesBuscados] = useState([]); // Estado para los países buscados

  useEffect(() => {
    AOS.init({
      offset: 50,
      duration: 500,
    });
  }, []);

  return (
    <Router basename="/">
      <SearchContext.Provider value={{ paisesBuscados, setPaisesBuscados }}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Principal />} />
            <Route path="/:pais" element={<PaginaPais />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </Router>
  );
}

export default App;