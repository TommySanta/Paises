import React, { useContext } from 'react';
import CajaPais from './CajaPais';
import { SearchContext } from '../web/Principal';

function Filtrado() {
    const { entradaUsuario, regionEle, apiData } = useContext(SearchContext);
    let contenidoRende;

    // Filtrado en base a la entrada del usuario y la elección de región


    if (entradaUsuario === '' && regionEle === '') {
        // Muestra todos los países si no hay entrada del usuario ni elección de región
        contenidoRende = apiData.map((country, index) => (
            <CajaPais
                key={index}
                flag={country.flags.png}
                name={country.name.common}
                population={country.population}
                region={country.region}
                capital={country.capital}
            />
        ));
    } else if (entradaUsuario === '' && regionEle !== '') {
        // Filtra los países por la región seleccionada si no hay entrada del usuario
        contenidoRende = apiData
            .filter(country => country.region === regionEle)
            .map((country, index) => (
                <CajaPais
                    key={index}
                    flag={country.flags.png}
                    name={country.name.common}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                />
            ));
    } else if (entradaUsuario !== '' && regionEle === '') {
        // Filtra los países cuyos nombres comienzan con la entrada del usuario
        contenidoRende = apiData
            .filter(country => country.name.common.toLowerCase().startsWith(entradaUsuario.toLowerCase()))
            .map((country, index) => (
                <CajaPais
                    key={index}
                    flag={country.flags.png}
                    name={country.name.common}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                />
            ));
    } else {
        // Filtra los países que coinciden con la entrada del usuario y la región seleccionada
        contenidoRende = apiData
            .filter(country =>
                country.name.common.toLowerCase().startsWith(entradaUsuario.toLowerCase()) &&
                country.region === regionEle)
            .map((country, index) => (
                <CajaPais
                    key={index}
                    flag={country.flags.png}
                    name={country.name.common}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                />
            ));
    }

    // Muestra un mensaje si no se encuentran países que coincidan
    if (contenidoRende.length === 0) {
        contenidoRende = (
            <div style={{ color: 'red', fontSize: '50px', textAlign: 'center', letterSpacing: '0.8px' }}>
                <p>No se encontró ningún país que coincida con tu entrada o filtro, por favor intenta algo diferente.</p>
            </div>
        );
    }

    return contenidoRende;
}

export default Filtrado;
