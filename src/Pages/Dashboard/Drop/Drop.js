import React, { useEffect, useState } from 'react';
import './Drop.css';

const Drop = () => {
    const [cities, setCities] = useState([]);
    const [selectedCounty, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");



    // country means city 
    const countries = {
        DepartmentA: ["Ishrafil", "Miraj"],
        DepartmentB: ["Dipta", "Taiful"],
        DepartmentC: ["Fahad", "Riyan"]
    };

    const countryList = Object.keys(countries).map(key => ({
        name: key
    }));

    function handleCountrySelect(e) {
        console.log("Selected country", e.target.value);
        const countrySel = e.target.value;
        const citiesSel = countrySel !== "" ? countries[countrySel] : "";
        setSelectedCountry(countrySel);
        setCities(citiesSel);
        setSelectedCity("");
    }

    function handleCitySelect(e) {
        console.log("Selected city", e.target.value);
        const citiesSel = e.target.value;
        setSelectedCity(citiesSel);
    }

    return (
        <div className="App">
            <h1>Example DropDown Coutries and Cities</h1>

            <div className="Container">
                <select
                    name="Countries"
                    onChange={e => handleCountrySelect(e)}
                    value={selectedCounty}
                >
                    <option value="">Select the country</option>
                    {countryList.map((country, key) => (
                        <option key={key} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>

                <select
                    name="Cities"
                    onChange={e => handleCitySelect(e)}
                    value={selectedCity}
                >
                    <option value="">Select the city</option>
                    {cities.map((city, key) => (
                        <option key={key} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Drop;