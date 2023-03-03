
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ConfirmModal(props:any){

    const [args] = useState(props.args);

    return (
        <Modal show={true} onHide={props.dismiss}>
        <Modal.Header closeButton>
          <Modal.Title>{args.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{args.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.dismiss}>
            No
          </Button>
          <Button variant="primary" onClick={props.close}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}


export default ConfirmModal;