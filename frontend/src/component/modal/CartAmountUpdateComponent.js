import services from '../../services/cartsService';
import { useState } from 'react';
import CartAmountModal from '../forms/CartUpdateAmountModal';

const CartAmountUpdateComponent = ({ id, itemId, unit, handleAmount }) => {
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
    await services.amountUpdate(url, newObject, id).then(() => {
      handleAmount(itemId, amount);
      handleClose();
    });
  };

  return (
    <div>
      <CartAmountModal amount={amount} setAmount={setAmount} handle={updateAmountItem} handleShow={handleShow} handleClose={handleClose} show={show} handleAmount={handleAmount} />
    </div>
  );
};
export default CartAmountUpdateComponent;
