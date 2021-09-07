const axios = require("axios");
module.exports = axios.create({
    baseURL: "https://api-gateway.intertech.com.tr/BankingApiV01/"
});