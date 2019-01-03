import React from 'react';

import { Col, Panel } from 'react-bootstrap';

const card = (props) => {
    return (
        <Col xs={12} sm={4}>
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">
                        {props.heading}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {props.content}
                </Panel.Body>
            </Panel>
        </Col>
    )
};

export default card;