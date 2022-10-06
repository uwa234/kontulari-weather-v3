import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import styled from "styled-components";

import data from "../../data";
import api from "../../services/api";

const SearchBox = (props) => {
  const [locations, setLocations] = useState([]);

  const key = "c5988cdc7fd873077a416c80164726c8";

  const handleOnSelect = (location) => {
    props.setLoading(true);
    api
      .get(
        `/onecall?lat=${location.lat}&lon=${location.lon}&&units=metric&appid=${key}`
      )
      .then((forecast) => {
        props.setForecast(forecast.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        props.setLoading(false);
      });
  };

  const handleOnSearch = async (string, results) => {
    const result = data.filter((location) => {
      return location.name.toLowerCase().includes(string.toLowerCase());
    });
    setLocations(result);
  };

  return (
    <Container className="fibo">
      <ReactSearchAutocomplete
        items={locations}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        autofocus
        placeholder="Enter your location..."
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 48px;
  text-align: center;
  & > *:first-child {
    margin: auto;
    width: 700px;
  }

`;

export default SearchBox;
