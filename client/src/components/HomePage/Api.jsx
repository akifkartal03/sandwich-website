import React from 'react';
import { Row, Col } from 'reactstrap';
const Api = props => {
    const serviceList = [
        'https://crm5api.herokuapp.com/api/v1/GetCustomerChannelCampaignList',
        'https://crm5api.herokuapp.com/api/v1/GetCustomerChannelCampaignList/:CampaignId',
        'https://crm5api.herokuapp.com/api/v1/GetCustomerDefinedCampaigns/:CustomerNo',
        'https://crm5api.herokuapp.com/api/v1/SaveCustomerAnswer',
        'https://crm5api.herokuapp.com/api/v1/GetDummyCampaigns',
        'https://crm5api.herokuapp.com/api/v1/GetStories',
        'https://crm5api.herokuapp.com/api/v1/GetDefaults',
        'https://crm5api.herokuapp.com/api/v1/GetDonations',
        'https://crm5api.herokuapp.com/api/v1/GetInterStories',
        'https://crm5api.herokuapp.com/api/v1/GetInterDefaults',
        'https://crm5api.herokuapp.com/api/v1/GetInterDonations'
    ];
    return (
        <div
            style={{
                paddingLeft: 60,
                paddingTop: 10
            }}
        >
            <table>
                <Row>
                    <h1>Welcome to CRM API</h1>
                </Row>
                <Row>
                    <h5>All Services are following</h5>
                </Row>
                <br />
                <Row>
                    <Col>
                        {serviceList.slice(0, 5).map((value, index) => {
                            return (
                                <Row>
                                    <p style={{paddingRight:"100px"}}>{value}</p>
                                </Row>
                            );
                        })}
                    </Col>
                    
                    <Col>
                        {serviceList.slice(5, 11).map((value, index) => {
                            return (
                                <Row>
                                    <p style={{paddingLeft:"50px"}}>{value}</p>
                                </Row>
                            );
                        })}
                    </Col>
                </Row>
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
            </table>
        </div>
    );
};

export default Api;
