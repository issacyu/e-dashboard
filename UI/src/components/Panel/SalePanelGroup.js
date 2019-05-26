import React from 'react';

import { Row, Col, Panel } from 'react-bootstrap';
import './PanelGroup.css';

const salePanelGroup = (props) => {
    return (
        <Row>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Total Sale: ${props.totalSale}
                    </Panel.Body>
                </Panel>
            </Col>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Total Profit: ${props.totalProfit}
                    </Panel.Body>
                </Panel>
            </Col>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Total Order: {props.totalOrder}
                    </Panel.Body>
                </Panel>
            </Col>
            <Col md={3} lg={3}>
                <Panel>
                    <Panel.Body className='PanelBody'>
                        Total Return: {props.totalReturn}
                    </Panel.Body>
                </Panel>
            </Col>
        </Row>
    )
};

export default salePanelGroup;