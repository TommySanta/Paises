import React, { useContext } from "react";
import { SearchContext } from "../web/Principal";
import "../Styles/Filter.css";
import { FaMagnifyingGlassArrowRight } from "react-icons/fa6";

function Filter() {
    const { entradaUsuario, entradaElegida, regionEle, setRegionChoice } =
        useContext(SearchContext);

    const handleUserInput = (event) => {
        entradaElegida(event.target.value);
    };

    const handleRegionChoice = (event) => {
        const selectedRegion = event.target;
        const value = selectedRegion.getAttribute("value");
        setRegionChoice(value);
    };

    return (
        <section className="filter-results-container">
            <div className="filter-input" data-aos="fade-right">
                <input
                    type="text"
                    placeholder="Search for a country ..."
                    id="countryNameInput"
                    value={entradaUsuario}
                    onChange={handleUserInput}
                    name="Nombre del Pais"
                    title="Buscar un país"
                />
                <FaMagnifyingGlassArrowRight id="searchIcon" title="Search Icon" />
            </div>

            <div className="custom-dropdown" data-aos="fade-left">
                <div className="selected-option" title="Filtrar por pais seleccionado">
                    {regionEle === "" ? "Elegir Region" : regionEle}
                </div>
                <ul
                    className={`options`}
                    onClick={handleRegionChoice}
                >
                    <li title="All" value="">Todos</li>
                    <li title="Africa" value="Africa">Africa</li>
                    <li title="Americas" value="Americas">America</li>
                    <li title="Asia" value="Asia">Asia</li>
                    <li title="Europe" value="Europe">Europa</li>
                    <li title="Oceania" value="Oceania">Oceania</li>
                </ul>
            </div>
        </section>
    );
}

export default Filter;
