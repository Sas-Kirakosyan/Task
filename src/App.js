import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropMenu from './components/dropMenu';

import './App.css';

function App() {

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({ hits: [] });
  const [weather, setWeather] = useState({});
  const [cloudOrSunny, setCloudOrSunny] = useState('')
  const [city, setCity] = useState('');

  const anchorRef = React.useRef(null);

  const handleToggle = (e) => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleChooseCity = (e) => {
    setCity(e)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  const dateBilder = (d) => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    return `${day} ${date} ${month} ${year}`
  }

  // const sities = ['London', 'Los Angeles', 'Washington', 'san Francisco', 'Fresno'];

  useEffect(() => {
    if (city !== '') {
      try {
        const fetchData = async () => {
          const result = await axios(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&unets=metric&APPID=b83c82af01091468a48fc9ccb073f257`,
          );
          setWeather(result.data.main);
          setData(result.data);
          setCloudOrSunny(result.data.weather[0])
        };
        fetchData();
      } catch (e) {
        console.log('axios requst feiled')
      }
    }
  }, [city]);
  console.log('result',data)



  return (
    <div className="App">
      <DropMenu
        handleChooseCity={handleChooseCity}
        anchorRef={anchorRef}
        autoFocusItem={open}
        anchorEl={anchorRef.current}
        handleToggle={handleToggle}
        handleClose={handleClose}
        open={open} />
      <div><img src={'./img/background.png'} alt="background" /></div>
      {typeof weather.temp === 'number' && <div className="data-container">

        <ul className="data-ul">
          <li className="name-li">{city} City</li>
          <li className="date-li">{dateBilder(new Date())}</li>
          <li className="data li" style={{ fontSize: 70 }} >{273 - Math.floor(weather.temp)}°C </li>
          <li className="data li">{cloudOrSunny.main}</li>
          <li className="data li"></li>
          <li className="data li"></li>
        </ul>
      </div>}
    </div>
  );
}

export default App;
