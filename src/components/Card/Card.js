import React from 'react';

import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import { Col } from 'react-bootstrap';

const card = (props) => {
    return (
            <Col xs={6} md={3}>
                <Card>
                    <CardHeader>Header</CardHeader>
                    <CardBody>Body</CardBody>
                </Card>
            </Col>
    )
};

export default card;