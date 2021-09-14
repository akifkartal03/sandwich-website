const router = require("express").Router();
const { response } = require("express");
let cmpService = require("./service");
let example_json = require("../interApi_example.json");

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
router.route("/GetDefaults").get((req, res) => {
  res.json(cmpService.GetGeneral());
});
router.route("/GetStories").get((req, res) => {
  res.json(cmpService.GetStories());
});
router.route("/GetDonations").get((req, res) => {
  res.json(cmpService.GetDonation());
});
router.route("/GetInterDefaults").get((req, res) => {
  let arr = [];
  cmpService
    .GetCustomerChannelCampaignList()
    .then((response) => {
      response.map((value) => {
        if (
          value.CampaignId > 96107 &&
          value.CampaignId < 96123 &&
          value.Details[0].TemplateCode == "Default"
        ) {
          arr.push(value);
        }
      });
      res.json(arr);
    })
    .catch((e) => {
      console.log(e);
    });
});
router.route("/GetInterStories").get((req, res) => {
  let arr = [];
  cmpService
    .GetCustomerChannelCampaignList()
    .then((response) => {
      response.map((value) => {
        if (
          value.CampaignId > 96107 &&
          value.CampaignId < 96123 &&
          value.Details[0].TemplateCode == "Story"
        ) {
          arr.push(value);
        }
      });
      res.json(arr);
    })
    .catch((e) => {
      console.log(e);
    });
});
router.route("/GetInterDonations").get((req, res) => {
  let arr = [];
  cmpService
    .GetCustomerChannelCampaignList()
    .then((response) => {
      response.map((value) => {
        if (
          value.CampaignId > 96107 &&
          value.CampaignId < 96123 &&
          value.Details[0].TemplateCode == "Discover"
        ) {
          arr.push(value);
        }
      });
      res.json(arr);
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
  console.log(req.body);
  res.json(example_json);
});
router.route("/GetDummyCampaigns/:id").get((req, res) => {
  let isFound = false;
  example_json.map((value, index) => {
    if (value.CampaignId == req.params.id) {
      isFound = true;
      res.status(200).json(value);
    }
  });
  if (!isFound) {
    res.status(400).json({ Error: "Not Found" });
  }
});

router.route("/GetCustomerChannelCampaignList/:id").get((req, res) => {
  let isFound = false;
  cmpService
    .GetCustomerChannelCampaignList()
    .then((response) => {
      response.map((value, index) => {
        if (value.CampaignId == req.params.id) {
          isFound = true;
          res.status(200).json(value);
        }
      });
      if (!isFound) {
        res.status(400).json({ Error: "Not Found" });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

router.route("/SaveCustomerAnswer").post((req, res) => {
  cmpService
    .saveCustomer(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
