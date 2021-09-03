const http = require("./htpp_common");
const axios = require("axios");

function GetCustomerChannelCampaignList() {
  return getAll1()
    .then((response) => {
      return response.data.Data.CampaignList;
    })
    .catch((e) => {
      console.log(e);
    });
}
const getAll1 = () => {
  const options = {
    Header: {
      AppKey: "API7909c7de460b462aa1d",
      Channel: "API",
      ChannelSessionId: "331eb5f529c74df2b800926b5f34b874",
      ChannelRequestId: "5252012362481156055",
    },
    Parameters: [
      {
        ChannelType: "24",
        ApplicationCode: "DKAPP",
        Filter: 1,
      },
    ],
  };

  let axiosConfig = {
    headers: {
      "Ocp-Apim-Subscription-Key": "c155fd79bb9f436fb304b5d19fa0c527",
    },
  };

  return http.post("/GetCustomerChannelCampaignList", options, axiosConfig);
};

function GetCustomerDefinedCampaigns(customerNo) {
  return getAll2(customerNo)
    .then((response) => {
      return response.data.Data.DefinedCampaignList;
    })
    .catch((e) => {
      console.log(e);
    });
}
const getAll2 = (customerNo) => {
  const options = {
    Header: {
      AppKey: "API7909c7de460b462aa1d",
      Channel: "API",
      ChannelSessionId: "331eb5f529c74df2b800926b5f34b874",
      ChannelRequestId: "5252012362481156055",
    },
    Parameters: [
      {
        MobileApplicationCode: "5",
        CustomerNo: customerNo,
      },
    ],
  };

  let axiosConfig = {
    headers: {
      "Ocp-Apim-Subscription-Key": "c155fd79bb9f436fb304b5d19fa0c527",
    },
  };

  return http.post("/GetCustomerDefinedCampaigns", options, axiosConfig);
};


module.exports = {
  getAll1,
  GetCustomerChannelCampaignList,
  GetCustomerDefinedCampaigns,
  getAll2,
};
