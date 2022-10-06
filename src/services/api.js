import axios from "axios";
// const url = "https://api.openweathermap.org/data/2.5/weather?q= " + query + "&units= " + unit + "&appid=" + appkey + ""
const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export default api;
