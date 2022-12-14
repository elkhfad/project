import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsExclamationCircle } from 'react-icons/bs';

const Confirm = ({ title, body, handleClick, confirm, confirmColor, cancelColor, buttonColor, icon, itemDeleteBtn }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className={itemDeleteBtn} variant={buttonColor} onClick={handleShow}>
        {icon}
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="modalCenter">
        <Modal.Header closeButton>
          <Modal.Title style={{ margin: '0 auto' }}>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="iconStyle danger">
            <BsExclamationCircle />
          </div>

          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant={cancelColor} onClick={handleClose}>
            No, cancel
          </Button>
          <Button variant={confirmColor} onClick={handleClick}>
            {confirm}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Confirm;
