import axios from "axios";
const baseURL = "https://fakestoreapi.com/";
const myAxios = axios.create({
  baseURL,
});

export default myAxios;
