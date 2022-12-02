import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { MdAddShoppingCart } from 'react-icons/md';
import { useCurrentUser } from '../../services/currenUser';

const CartAmountComponent = ({ amount, setAmount, handle, handleClose, handleShow, show, handleAmount }) => {
  const { currentUser } = useCurrentUser();

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="addToShoppingCart" disabled={!currentUser} style={{ width: '3em' }}>
        <MdAddShoppingCart style={{ fontSize: '1.5em' }} />
        {amount > 0 && <div style={{ fontWeight: '800' }}>{amount}</div>}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How many</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="btnCartAddAmount">
            <Button className="btnMinus" disabled={amount === 0} onClick={() => setAmount(amount - 1)}>
              -
            </Button>
            {amount}
            <Button className="btnPlus" disabled={amount === 10} onClick={() => setAmount(amount + 1)}>
              +
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="addToShoppingCart"
            disabled={amount === 0}
            onClick={() => {
              handle();
              handleClose();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default CartAmountComponent;
