import React, { useState } from "react";
import styled from "styled-components";

const WeatherCard = (props) => {
  const [forecast] = useState(props.forecast);

  function calculateWeatherCondition() {
    if (forecast.current.temp > 25) {
      return (<p>Tip: Go to the Beach</p>);
    }
    return (<p>Tip: Stay Home</p>);
  }

  return (
    <Container>
      <h6>Timezone: {forecast.timezone}</h6>
      <span>Temp: {forecast.current.temp}ºC</span>
      <p>Feels Like: {forecast.current.feels_like}ºC</p>
      <p>Weather: {forecast.current.weather[0].description}</p>
      <p>Humidity: {forecast.current.humidity}</p>
      
      {calculateWeatherCondition()}
    </Container>
  );
};

const Container = styled.div`
  color: #32325d;
  margin-top: 418px;
  margin: auto;
  padding: 36px;
  width: 500px;
  h1 {
    color: #32325d;
    font-size: 52px;
    font-weight: 600;
    line-height: 52px;
    padding-bottom: 48px;
    padding-top: 48px;
    text-align: center;
  }
  h6 {
    font-size: 2rem;
    margin-bottom: 32px;
    ${'' /* margin-top: 264px; */}
  }
  span {
    font-size: 6rem;
    margin-top: 8px;
  }
  p {
    margin: 8px;
  }
`;

export default WeatherCard;
