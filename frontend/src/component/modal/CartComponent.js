import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { MdAddShoppingCart } from 'react-icons/md';
import { useState } from 'react';
import cartService from '../../services/cartsService';

const CartComponent = ({ id, setError, cartUrl, cartdata, setCartData }) => {
  const [amount, setAmount] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cartWishUrl = '/api/carts/wishlist';

  const buyItems = async () => {
    if (Object.keys(cartdata?.buyItems || {}).length > 0) {
      const newItemToCart = {
        buyItem: id,
        amount: amount,
      };
      const cart = {
        buyItems: newItemToCart,
        time: cartdata.time,
        user: cartdata.user,
      };
      await cartService
        .addItemToCart(cartWishUrl, cart)
        .then((res) => {
          setCartData(res);
          setError(null);
          handleClose();
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      const createCart = {
        buyItem: id,
        amount: amount,
      };
      cartService.create(cartUrl, createCart).then((res) => {
        setCartData(res);
        handleClose();
        setError(null);
      });
    }
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="addToShoppingCart">
        <MdAddShoppingCart style={{ fontSize: '2em' }} />
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
              buyItems();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default CartComponent;
