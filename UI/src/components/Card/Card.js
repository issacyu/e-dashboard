import React from 'react';

import { Col, Panel } from 'react-bootstrap';

const card = (props) => {
    return (
        <Col xs={12} sm={3}>
            <Panel>
                <Panel.Heading >
                    <Panel.Title componentClass="h3">
                        {props.title}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {props.body}
                </Panel.Body>
            </Panel>
        </Col>
    )
};

export default card;