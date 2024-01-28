import React, { useState, useEffect } from "react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
  const [theme, setTheme] = useState("oscuro");

  const updateTheme = () => {
    const newTheme = theme === "oscuro" ? "blanco" : "oscuro";
    setTheme(newTheme);
    const AppContainer = document.querySelector(".App");
    localStorage.setItem("Tema", newTheme);
    AppContainer.className = `App ${newTheme === "blanco" ? "lightMode" : "darkMode"}`;
  };

  useEffect(() => {
    const getTheme = localStorage.getItem("theme");

    if (getTheme === null || getTheme === "")
        localStorage.setItem("Tema", "oscuro");
    else
      setTheme(getTheme);
    
    const appContainer = document.querySelector(".App");
    appContainer.className = `App ${getTheme === "blanco" ? "lightMode" : "darkMode"}`;
  }, []);

  return (
    <nav className="navbar-section" data-aos="fade-down">
        <FaReact className="react-icon" />
        <h1 className="navbar-title"><Link to="/" title="NacionesAlDía">NacionesAlDía</Link></h1>
        <button className="navbar-btn" type="button" title="Toggle Theme" onClick={updateTheme}>
            {theme === "oscuro" ? <BsFillMoonStarsFill /> : <BsSunFill />} Modo {theme === "oscuro" ? "oscuro" : "blanco"} 
        </button>
    </nav>
  );
}

export default Navbar;
