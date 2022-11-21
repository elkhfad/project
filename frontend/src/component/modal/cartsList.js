import { useGetCartList } from '../control/useGetCardList';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
import { IoReturnDownBackOutline } from 'react-icons/io5';

const CartList = () => {
  const cartUrl = 'http://localhost:3001/api/carts/all';
  const { cartdata, isPending } = useGetCartList(cartUrl);
  const navigate = useNavigate();

  const seeList = (id) => {
    navigate(`cart/${id}`);
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
      <div className="cartList">
        {cartdata.map((d, index) => {
          return (
            <div key={d.id + index} className="cartStyle">
              <Button onClick={() => seeList(d.id)} className="cartBtn">
                <div>
                  {index + 1} cart {`${' '}`} created {moment(new Date(d.time)).format('DD/MM/YYYY hh:mm:ss')}
                </div>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartList;
