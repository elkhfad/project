import { useGetCartList } from '../control/useGetCardList';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CartList = () => {
  const cartUrl = '/api/carts/all';
  const { cartdata } = useGetCartList(cartUrl);
  const navigate = useNavigate();
  useEffect(() => {
    cartdata.map((d, index) => {
      if (d.wish === true) {
        return (
          <div key={d.id + index} className="cartStyle">
            {navigate(`${d.id}`)}
          </div>
        );
      }
      return '';
    });
  }, [cartdata, navigate]);

  return <div></div>;
};

export default CartList;
