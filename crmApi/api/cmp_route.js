const router = require("express").Router();
const { response } = require("express");
let cmpService = require("./service");
let example_json = require("../campaign_example.json");

router.route("/GetCustomerChannelCampaignList").get((req, res) => {
  cmpService
    .GetCustomerChannelCampaignList()
    .then((response) => {
      //console.log(response);
      res.json(response);
    })
    .catch((e) => {
      console.log(e);
    });
});
router.route("/GetCustomerDefinedCampaigns/:id").get((req, res) => {
  cmpService
    .GetCustomerDefinedCampaigns(req.params.id)
    .then((response) => {
      //console.log(response);
      res.json(response);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.route("/GetDummyCampaigns").get((req, res) => {
  res.json(example_json);
});
router.route("/GetDummyCampaigns/:id").get((req, res) => {
  let isFound = false;
  example_json.map((value, index) => {
    if(value.campaignId == req.params.id){
      isFound = true;
      res.status(200).json(value);
    }
  })
  if(!isFound){
    res.status(400).json({"Error":"Not Found"});
  }
});

module.exports = router;
