import axios from "axios";
export default axios.create({
    baseURL: "https://crm5api.herokuapp.com/"
  });