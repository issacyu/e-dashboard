import React from 'react';

import { Panel } from 'react-bootstrap';

const alert = (props) => {
    return (
        <Panel bsStyle='danger' defaultExpanded>
            <Panel.Heading>
                <Panel.Title toggle>
                    Warning
                </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
            <Panel.Body>
                <div>-Alert message 1</div>
                <div>-Alert message 2</div>
                <div>-Alert message 3</div>
            </Panel.Body>
            </Panel.Collapse>
        </Panel>
    );
}

export default alert;