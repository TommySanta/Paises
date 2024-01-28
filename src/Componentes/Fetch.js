import React, { useEffect, useState, useContext } from "react";
import Filtrado from "./Filtrado";
import Error from "./Error";
import Loader from "./Loader";
import { SearchContext } from "../web/Principal";
import "../Styles/Fetch.css";

function Fetch() {
    const { setApiData, apiError, setApiError } = useContext(SearchContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        fetch("https://restcountries.com/v3.1/all")
            .then((response) => {
                if (!response.ok)
                    throw new Error(`¡Error HTTP! Estado: ${response.status}`);

                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setApiData(data);
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    if (error.message === "Fallo en recuperar") {
                        setApiError("Sin conexión a Internet. Por favor verifique su red.");
                    } else {
                        setApiError("Se produjo un error al obtener datos de la API.");
                    }
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [setApiData, setApiError]);

    return (
        <section className="main-body-section">
            {loading && <div className="main-body-error"><Loader /></div>}
            {!loading && apiError && <div className="main-body-error"><Error error={apiError} /></div>}
            {!loading && !apiError && <div className="main-body-container" data-aos="fade-up"><Filtrado /></div>}
        </section>
    );
}

export default Fetch;
