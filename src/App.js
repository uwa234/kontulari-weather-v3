import React, { useEffect, useState } from "react";
import background from "./assets/background.png";
import styled from "styled-components";
import SearchBox from "./components/SearchBox";
import api from "./services/api";
import WeatherCard from "./components/WeatherCard";
import "./style.css"
import { Button, Box } from "react-bootstrap";


function App() {
  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(true);
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme =  window.localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme !== '' ? storedTheme: defaultDark ? 'dark' : 'light');
  const key = "c5988cdc7fd873077a416c80164726c8";
    

  useEffect(() => {
    if (Object.keys(forecast).length === 0) {
      api
        .get(`/onecall?lat=-12.9704&lon=-38.5124&&units=metric&appid=${key}`)
        .then((response) => {
          console.log(response.data);
          setForecast(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [forecast]);

  const Weather =
    loading || Object.keys(forecast).length === 0 ? (
      <h1>Loading...</h1>
    ) : (
      <WeatherCard forecast={forecast} />
    );

  return (
      <Container className={(theme === "dark" ? "dark":"")} >
      <div style={{textAlign:"right"}}>
          <Button onClick={() => {
            let dTheme = theme === "dark" ? "":"dark"
              setTheme(dTheme);
              window.localStorage.setItem('theme', dTheme);
            }}>Toggle DarkMode</Button>
      </div>
        <h1>Kontulari Weather</h1>
        <SearchBox setForecast={setForecast} setLoading={setLoading} />
        {Weather}
      
    </Container>
  );
}

const Container = styled.div`
  background: #1de9b6;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  font-family: "neutra", sans-serif;
  height: 100%;
  min-height: 100vh;
  text-align: center;
  
  h1 {
    color: #32325d;
    font-size: 64px;
    font-weight: 600;
    line-height: 52px;
    padding-bottom: 48px;
    padding-top: 128px;
    text-align: center;
  }

  @media screen and (max-width : 768px) {
    h1, h6, span, p {
         font-size: 18px;
         line-height: 15px;
         text-align: center;
         width: auto;
     }
  }
  
  /* Small Devices, Notebooks */
  @media screen and (max-width: 650px) {
    h1, h6, span, p {
      font-size: 18px;
      line-height: 15px;
      text-align: center;
      width: auto;

  }
  
  }
  /* Extra Small Devices, Phones */
  @media screen and (max-width: 480px) {
    h1, h6, span, p {
      font-size: 18px;
      line-height: 15px;
      text-align: center;
      width: auto;
  }
  
  }

  
`;

export default App;