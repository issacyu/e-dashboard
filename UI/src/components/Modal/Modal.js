import React from 'react';

import {Modal, Button} from 'react-bootstrap';

const modal = (props) => {
    return(
        <Modal show={props.showModal}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.body}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {props.toggle()}}>OK</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default modal;