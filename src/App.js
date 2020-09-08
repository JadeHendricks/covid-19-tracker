import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import { sortData } from './utils';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getWorldWide();
    getCountriesData();
  }, [])

  const getWorldWide = async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/all');
    setCountryInfo(response.data);
  }

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const response = await axios.get(url);
    setCountry(countryCode);
    setCountryInfo(response.data);
  }

  const getCountriesData = async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/countries');
    const countries = response.data.map(( country ) => (
      {
        name: country.country,
        value: country.countryInfo.iso2
      }
    ));

    const sortedData = sortData(response.data);
    setTableData(sortedData);
    setCountries(countries);
  }

  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox title="Coronavirus Cases" cases={ countryInfo.todayCases } total={ countryInfo.cases }/>
          <InfoBox title="Recovered" cases={ countryInfo.todayRecovered } total={ countryInfo.recovered } />
          <InfoBox title="Deaths" cases={ countryInfo.todayDeaths } total={ countryInfo.deaths } />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={ tableData } />
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
