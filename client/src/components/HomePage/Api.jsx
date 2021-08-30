import React from 'react';
import { Row } from "reactstrap";
const Api = (props) => {
  return (
    <div
      style={{
        paddingLeft: 50,
        paddingTop: 15,
      }}
    >
      <Row>
          <h1>Welcome to CRM API</h1>
      </Row>
      <Row>
          <h5>Some Services are following</h5>
      </Row>
      <Row>
          <p>https://crm5api.herokuapp.com/api/v1/GetCustomerChannelCampaignList</p>
      </Row>
      <Row>
          <p>https://crm5api.herokuapp.com/api/v1/GetCustomerDefinedCampaigns/:CustomerId</p>
      </Row>
    </div>
  );
};

export default Api;