import React from 'react';

const navigationItem = (props) => (
    <div onClick = {props.clicked}>
        {props.children}
    </div>
);

export default navigationItem;