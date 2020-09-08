import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";

function App() {

  const [countries, setCountries] = useState([]);

  useEffect(() => {

    const getCountriesData = async () => {
      const response = await axios.get('https://disease.sh/v3/covid-19/countries');
      const countries = response.data.map(( country ) => (
        {
          name: country.country,
          value: country.countryInfo.iso2
        }
      ));
      
      setCountries(countries);
    }

    getCountriesData();

  }, [])

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            { countries.map(country => <MenuItem key={ country.value } value={ country.value }>{ country.name }</MenuItem>) }
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
