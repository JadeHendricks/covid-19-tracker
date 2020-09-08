import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoBox from './components/infoBox';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    getCountriesData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  //API CALLS
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

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={ country } onChange={ onCountryChange }>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            { countries.map(country => <MenuItem value={ country.value }>{ country.name }</MenuItem>) }
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={ 1234 } total={ 2000 }/>
        <InfoBox title="Recovered" cases={ 1234 } total={ 3000 } />
        <InfoBox title="Deaths" cases={ 1234 } total={ 4000 } />
      </div>
    </div>
  );
}

export default App;
