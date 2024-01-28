import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import "../Styles/CajaPais.css";

function CajaPais(variable) {
    return (
        <Link to={`/${variable.name}`} title={variable.name}>
            <div className="country-card">
                <div className="ctd-img">
                    <img src={variable.flag} alt={`${variable.name} Flag`} />
                </div>

                <div className="ctd-info">
                    <div className="container">
                        <p className="ctd-title">{variable.name}</p>
                        <FaCheck className="react-iconcaja" />
                    </div>
                    <p className="ctd-desc">
                        <strong>Capital: </strong>
                        {variable.capital ? variable.capital : <span>--</span>}
                    </p>
                    <p className="ctd-desc">
                        <strong>Region: </strong>
                        {variable.region ? variable.region : <span>--</span>}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default CajaPais;
