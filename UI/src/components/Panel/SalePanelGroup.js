import React from 'react';

import { Row, Col, Panel } from 'react-bootstrap';
import './PanelGroup.css';

const salePanelGroup = (props) => {
    return (
        <Row>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Sale: $123
                    </Panel.Body>
                </Panel>
            </Col>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Renvenue: $67
                    </Panel.Body>
                </Panel>
            </Col>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Order: 66
                    </Panel.Body>
                </Panel>
            </Col>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Return: 10
                    </Panel.Body>
                </Panel>
            </Col>
        </Row>
    )
};

export default salePanelGroup;