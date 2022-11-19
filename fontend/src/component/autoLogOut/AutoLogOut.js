import { useEffect, useState } from 'react';
import IdleTimer from './IdleTimer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsExclamationCircle } from 'react-icons/bs';

export default function AutoLogOut() {
  const [isTimeout, setIsTimeout] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 600, //seconds
      onTimeout: () => {
        setIsTimeout(true);
        handleShow();
      },
      onExpired: () => {
        setIsTimeout(true);
      },
      onDestroy: () => {},
    });

    return () => {
      if (isTimeout) {
        timer.cleanUp();
      }
    };
  }, [isTimeout, show]);

  return (
    <div>
      {isTimeout ? (
        <>
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="modalCenter">
            <Modal.Header>
              <Modal.Title style={{ margin: '0 auto' }}>You have been locked out !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="iconStyle warning">
                <BsExclamationCircle />
              </div>
              {`You have not been active for 10 min`}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                onClick={() => {
                  window.location.href = '/signIn';
                }}
              >
                ok
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
