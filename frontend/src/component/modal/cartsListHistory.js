import { useGetCartList } from '../control/useGetCardList';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import Confirm from './Confirm';
import { BsTrash } from 'react-icons/bs';
import services from '../../services/cartsService';
import { useEffect, useState } from 'react';

const CartsListHistory = () => {
  const cartUrl = '/api/carts/all';
  const url = '/api/carts';
  const { cartdata, isPending } = useGetCartList(cartUrl);
  const navigate = useNavigate();
  const [cartHistory, setCartHistory] = useState([]);
  const handleTime = (time) => {
    const newTime = new Date(time);
    return newTime.toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' });
  };
  useEffect(() => {
    const history = cartdata.filter((cart) => {
      return cart.wish === false;
    });
    setCartHistory(history);
  }, [cartdata]);
  const seeList = (id) => {
    navigate(`${id}`);
  };
  const handleDelete = (id) => {
    const removeHistory = cartHistory?.filter((cart) => {
      return cart.id !== id;
    });
    setCartHistory(removeHistory);
    services.deleteCart(url, id);
  };
  return (
    <div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>
        <Button style={{ float: 'right', marginRight: '4em', marginTop: '1em' }} className="returnToList" onClick={() => navigate('/')}>
          Back <IoReturnDownBackOutline />
        </Button>
      </div>
      <br />
      <div className="carthistory">
        <div className="reviewHistory">{cartHistory.length > 0 ? 'Review your orders' : 'You have no previous orders'}</div>
        {cartHistory.map((d, index) => {
          return (
            <div key={d.id + index} className="cartStyle" style={{ marginBottom: '1em', marginTop: '2em' }}>
              <Button onClick={() => seeList(d.id)} className="cartHistoryBtn">
                cart created {handleTime(d.time)}
              </Button>
              <Confirm
                icon={<BsTrash />}
                title={`Are you sure ?`}
                body={`You won't be able to revert deleted item!`}
                confirm="Yes delete it"
                cancelColor="success"
                confirmColor="danger"
                buttonName="Delete"
                itemDeleteBtn="cartHistoryDeleteBtn"
                handleClick={() => {
                  handleDelete(d.id);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartsListHistory;
