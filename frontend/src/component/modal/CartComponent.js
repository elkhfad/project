import cartService from '../../services/cartsService';
import CartAmountComponent from '../forms/CartAmountComponent';
import { useState } from 'react';
import { useCartsContext } from '../contexts/useCartsContext';
const CartComponent = ({ id, setError, cartdata, setCartData, handleCartAdd, setItemInCart }) => {
  const { dispatch } = useCartsContext();
  const cartUrl = '/api/carts';
  const cartWishUrl = '/api/carts/wishlist';
  const [amount, setAmount] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          handleCartAdd();
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      const createCart = {
        buyItem: id,
        amount: amount,
        time: new Date(),
      };
      cartService.create(cartUrl, createCart).then((res) => {
        dispatch({ type: 'CREATE_CART', payload: { res } });
        setCartData(res);
        handleClose();
        setError(null);
        setItemInCart(1);
      });
    }
  };
  return (
    <div>
      <CartAmountComponent amount={amount} setAmount={setAmount} handle={buyItems} handleShow={handleShow} handleClose={handleClose} show={show} />
    </div>
  );
};
export default CartComponent;
