import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-2-a878f.firebaseio.com/",
});

export default instance;
