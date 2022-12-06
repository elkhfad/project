import { useEffect, useState } from 'react';
import services from '../../services/cartsService';
export const useGetCartList = (url) => {
  const [cartdata, setCartData] = useState([{}]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    services
      .getAllCartByUser(url)
      .then((res) => {
        if (!res.status === 'OK') {
          throw Error('could not load data');
        }
        setIsPending(false);
        setCartData(res);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [url]);
  return {
    cartdata,
    error,
    isPending,
    setCartData,
  };
};
export const useGetCartById = (url, id) => {
  const cartUrl = '/api/carts/all';
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const { cartdata, setCartData } = useGetCartList(cartUrl);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({
    buyItems: [{ buyItem: '', amount: 0, price: 0, _id: '' }],
    id: '',
    time: '',
    user: '',
    wish: false,
    address: '',
  });
  useEffect(() => {
    services
      .getById(url, id)
      .then((res) => {
        if (!res.status === 'OK') {
          throw Error('could not load data');
        }
        setIsPending(false);
        setData(res.data);
        setCart(
          cartdata.find((cart) => {
            return cart.id === id;
          })
        );
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id, url, cartdata]);
  return {
    error,
    isPending,
    data,
    setData,
    cart,
    setCart,
    cartdata,
    setCartData,
    setError,
    setIsPending,
  };
};
