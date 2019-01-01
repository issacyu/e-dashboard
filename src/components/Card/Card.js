import React from 'react';

import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import { Col, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';

const card = (props) => {
    return (
        <Col xs={12} sm={4}>
            <Card>
                {/* <CardHeader>What is Lorem Ipsum?</CardHeader> */}
                <CardBody>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </CardBody>
            </Card>
        </Col>
    )
};

export default card;