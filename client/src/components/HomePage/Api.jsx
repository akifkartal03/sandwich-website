import React from 'react';
import { Row } from 'reactstrap';
const Api = props => {
    const serviceList = [
        'https://crm5api.herokuapp.com/api/v1/GetCustomerChannelCampaignList',
        'https://crm5api.herokuapp.com/api/v1/GetCustomerChannelCampaignList/:CampaignId',
        'https://crm5api.herokuapp.com/api/v1/GetCustomerDefinedCampaigns/:CustomerNo',
        'https://crm5api.herokuapp.com/api/v1/GetDummyCampaigns',
        'https://crm5api.herokuapp.com/api/v1/GetDummyCampaigns/:CampaignId'
    ];
    return (
        <div
            style={{
                paddingLeft: 60,
                paddingTop: 10
            }}
        >
            <Row>
                <h1>Welcome to CRM API</h1>
            </Row>
            <Row>
                <h5>All Services are following</h5>
            </Row>
            <br />
            {serviceList.map((value, index) => {
                return (
                    <Row>
                        <p>{value}</p>
                    </Row>
                );
            })}
            <Row>
                <h4
                    style={{
                        paddingTop: 5
                    }}
                >
                    How it works?
                </h4>
            </Row>
            <Row>
                <img
                    style={{
                        paddingTop: 5,
                        paddingLeft: 30
                    }}
                    src="https://i.ibb.co/HKZm3Sz/backend.jpg"
                    alt="backend"
                    width="1200"
                    height="240"
                />
            </Row>
        </div>
    );
};

export default Api;
