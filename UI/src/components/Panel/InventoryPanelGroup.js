import React from 'react';

import { Row, Col, Panel } from 'react-bootstrap';
import './PanelGroup.css';

const inventoryPanelGroup = (props) => {
    return (
        <Row>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Total Item: 2123
                    </Panel.Body>
                </Panel>
            </Col>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Total Value: $9326
                    </Panel.Body>
                </Panel>
            </Col>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Total Cost: $20000
                    </Panel.Body>
                </Panel>
            </Col>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Average Cost: $63
                    </Panel.Body>
                </Panel>
            </Col>
        </Row>
    )
};

export default inventoryPanelGroup;