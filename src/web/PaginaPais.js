import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate, Link } from "react-router-dom";
import Error from "../Componentes/Error";
import Loader from "../Componentes/Loader";
import { buscarNombreP } from "../Componentes/PaisCode";
import "../Styles/PaginaPais.css";

function PaginaPais() {
    // useNavigate to change route/page path
    const navigate = useNavigate();
    const { pais } = useParams();
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNativeNames = (name) =>
        Object.values(name.nativeName).map((language) => language.common);

    const fetchCurrencies = (name) =>
        Object.values(name).map(
            (currencies) => `${currencies.name} (${currencies.symbol})`
        );

    useEffect(() => {
        // start loading screen and clear previous errors
        setLoading(true);
        setError(null);

        let isMounted = true;
        const fetchUrl =
            pais.length === 3
                ? `https://restcountries.com/v3.1/alpha/${pais}`
                : `https://restcountries.com/v3.1/name/${pais}?fullText=true`;

        fetch(fetchUrl)
            .then((response) => {
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);

                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setApiData(data[0]);
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    if (error.message === "Fallo en recuperar") {
                        setError("No internet connection. Please check your network.");
                    } else {
                        setError("Sin conexión a Internet. Por favor verifique su red.");
                    }
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [pais]);

    return (
        <section className="country-details-section">
            <div className="back-btn-container" data-aos="fade-right">
                <button
                    type="button"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <IoArrowBack /> Volver
                </button>
            </div>

            {loading ? (
                <Loader />
            ) : error ? (
                <Error error={error} />
            ) : (
                <div className="countryInfoSection">
                    <div className="countryFlag-container" data-aos="fade-right">
                        <img src={apiData.flags.png} alt={`${apiData.name.common} Flag`} title={`${apiData.name.common} Flag`} />
                    </div>

                    <div className="countryStats-container" data-aos="fade-left">
                        <p className="country-title">{apiData.name.common}</p>

                        <div className="country-details">
                            <div>
                                <p>
                                    <strong>Nombre nativo: </strong>
                                    {apiData.name ? (
                                        fetchNativeNames(apiData.name).map((names) => `${names}`).join(", ")
                                    ) : (
                                        <span>--</span>
                                    )}
                                </p>
                                <p>
                                    <strong>Capital: </strong>
                                    {apiData.capital && typeof apiData.capital === "object" ? (
                                        apiData.capital.map((record) => `${record}`).join(", ")
                                    ) : (
                                        <span>--</span>
                                    )}
                                </p>
                                <p>
                                    <strong>Población: </strong>
                                    {apiData.population ? (
                                        apiData.population.toLocaleString()
                                    ) : (
                                        <span>--</span>
                                    )}
                                </p>
                                <p>
                                    <strong>Region: </strong>
                                    {apiData.region ? apiData.region : <span>--</span>}
                                </p>
                                <p>
                                    <strong>Subregiones: </strong>
                                    {apiData.subregion ? apiData.subregion : <span>--</span>}
                                </p>
                            </div>

                            <div>
                                <p>
                                    <strong>Moneda: </strong>
                                    {apiData.currencies ? (
                                        fetchCurrencies(apiData.currencies).map((record) => `${record}`).join(", ")
                                    ) : (
                                        <span>--</span>
                                    )}
                                </p>
                                <p>
                                    <strong>Languajes: </strong>
                                    {apiData.languages ? (
                                        Object.values(apiData.languages).map((record) => `${record}`).join(", ")
                                    ) : (
                                        <span>--</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="country-border">
                            {apiData.borders && (
                                <p>
                                    <strong>Países vecinos: </strong>
                                </p>
                            )}
                            {apiData.borders ? (
                                apiData.borders.map((record, index) => {
                                    const countryName = buscarNombreP(record);
                                    return (
                                        <Link to={`/${record}`} key={index} title={countryName}>
                                            <span className="country-border-name">{countryName}</span>
                                        </Link>
                                    );
                                })
                            ) : (
                                <span className="no-countries">
                                    No hay países vecinos que compartan frontera con él.
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default PaginaPais;
