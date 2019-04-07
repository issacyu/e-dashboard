import React from 'react';

import {Modal, Button} from 'react-bootstrap';

const modal = (props) => {
    return(
        <Modal show={props.showModal} centered={true}>
            <Modal.Header>
                <Modal.Title bsStyle={props.style} id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.body}
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle={props.style} onClick={() => {props.toggle()}}>OK</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default modal;