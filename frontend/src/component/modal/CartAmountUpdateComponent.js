import services from '../../services/cartsService';
import CartAmountComponent from '../forms/CartAmountComponent';
import { useState } from 'react';

const CartAmountUpdateComponent = ({ id, itemId, unit }) => {
  const url = '/api/carts/amount';
  const [amount, setAmount] = useState(unit);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateAmountItem = async () => {
    const newObject = {
      itemId: itemId,
      amount: amount,
    };
    await services.amountUpdate(url, newObject, id);
  };

  return (
    <div>
      <CartAmountComponent amount={amount} setAmount={setAmount} handle={updateAmountItem} handleShow={handleShow} handleClose={handleClose} show={show} />
    </div>
  );
};
export default CartAmountUpdateComponent;
