import React from 'react';
import { Row } from 'reactstrap';
const Api = props => {
    const serviceList = [
        'https://crm5api.herokuapp.com/api/v1/GetCustomerChannelCampaignList',
        'https://crm5api.herokuapp.com/api/v1/GetCustomerDefinedCampaigns/:CustomerId',
        'https://crm5api.herokuapp.com/api/v1/GetDummyCampaigns'
    ];
    return (
        <div
            style={{
                paddingLeft: 50,
                paddingTop: 15
            }}
        >
            <Row>
                <h1>Welcome to CRM API</h1>
            </Row>
            <Row>
                <h5>Some Services are following</h5>
            </Row>
            <br></br>
            {serviceList.map((value, index) => {
                return (
                    <Row>
                        <p>{value}</p>
                    </Row>
                );
            })}
        </div>
    );
};

export default Api;
