const http = require("./htpp_common");
const axios = require("axios");
let example_json = require("../interApi2_example.json");

function GetCustomerChannelCampaignList() {
  return getAll1()
    .then((response) => {
      return response.data.Data.CampaignList;
    })
    .catch((e) => {
      console.log(e);
    });
}
/*function GetStories() {
  let arr = [];
  return GetCustomerChannelCampaignList()
    .then((response) => {
      response.map((value)=>{
        if(value.CampaignCausesExp == "Team5" && value.Details[0].TemplateCode == "Story"){
          arr.push(value);
        }
      });
      return arr;
    })
    .catch((e) => {
      console.log(e);
    });
}*/

function GetStories() {
  let arr = [];
  example_json.map((value) => {
    if (
      value.CampaignId > 96107 && value.CampaignId < 96123 &&
      value.Details[0].TemplateCode == "Story"
    ) {
      arr.push(value);
    }
  });
  return arr;
}
function GetDonation() {
  let arr = [];
  example_json.map((value) => {
    if (
      value.CampaignId > 96107 && value.CampaignId < 96123 &&
      value.Details[0].TemplateCode == "Discover"
    ) {
      arr.push(value);
    }
  });
  return arr;
}
function GetGeneral() {
  let arr = [];
  example_json.map((value) => {
    if (
      value.CampaignId > 96107 && value.CampaignId < 96123 &&
      value.Details[0].TemplateCode == "Default"
    ) {
      arr.push(value);
    }
  });
  return arr;
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

  return http.post(
    "/campaigns/GetCustomerChannelCampaignList",
    options,
    axiosConfig
  );
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

  return http.post(
    "/campaigns/GetCustomerDefinedCampaigns",
    options,
    axiosConfig
  );
};

const saveCustomerHelper = (body) => {
  const options = {
    Header: {
      AppKey: "API7909c7de460b462aa1d",
      Channel: "API",
      ChannelSessionId: "331eb5f529c74df2b800926b5f34b874",
      ChannelRequestId: "5252012362481156055",
    },
    Parameters: [
      {
        CampaignId: body.CampaignId,
        Type: 1,
        Value: "4",
        Text: "",
        IsTest: false,
        PyCode: "",
        PyRegisterId: 0,
        ActionType: "ENROLL",
        ChannelType: 24,
        ApplicationCode: "DKAPP",
        CustomerNo: body.CustomerNo,
      },
    ],
  };

  let axiosConfig = {
    headers: {
      "Ocp-Apim-Subscription-Key": "c155fd79bb9f436fb304b5d19fa0c527",
    },
  };

  return http.post("/customers/SaveCustomerAnswer", options, axiosConfig);
};
function saveCustomer(body) {
  return saveCustomerHelper(body)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
}
module.exports = {
  getAll1,
  GetCustomerChannelCampaignList,
  GetCustomerDefinedCampaigns,
  saveCustomerHelper,
  saveCustomer,
  getAll2,
  GetDonation,
  GetGeneral,
  GetStories,
};
