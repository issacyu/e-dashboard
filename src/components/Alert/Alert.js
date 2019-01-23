import React from 'react';

import { Panel } from 'react-bootstrap';

const alert = (props) => {
    const messages = props.messages.map(m => {
            return <li>{m}</li>
    })
    return (
        <Panel bsStyle='danger' defaultExpanded>
            <Panel.Heading>
                <Panel.Title toggle>
                    {props.title}
                </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
            <Panel.Body>
                <ul>
                    {messages}
                </ul>
            </Panel.Body>
            </Panel.Collapse>
        </Panel>
    );
}

export default alert;