import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import services from '../../services/cartsService';
import Table from 'react-bootstrap/Table';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import AlertComponent from '../Alert/AlertComponent';
import Confirm from './Confirm';
import { BsTrash } from 'react-icons/bs';
import moment from 'moment';
import { useGetCartList } from '../control/useGetCardList';

const Cart = () => {
  const navigate = useNavigate();
  const cartUrl = 'http://localhost:3001/api/carts/all';
  const [isPending, setIsPending] = useState(true);
  const { cartdata } = useGetCartList(cartUrl);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [carts, setCart] = useState([]);
  const url = 'http://localhost:3001/api/carts';
  const urlBuy = 'http://localhost:3001/api/carts/buy';
  useEffect(() => {
    services
      .getById(url, id)
      .then((res) => {
        setCart(res.data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setIsPending(false);
      });
  }, [id, url]);
  const handleBuy = () => {
    const updateCart = {
      items: carts.items,
      time: carts.time,
      user: carts.user,
      wish: false,
    };
    services
      .buyUpdate(urlBuy, updateCart, id)
      .then(() => {
        setError(null);
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const handleDelete = (id) => {
    services.deleteCart(url, id).then((res) => {
      navigate('/');
    });
  };
  const handleTime = () => {
    const cart = cartdata.filter((cart) => {
      return cart.id === id;
    });
    const time = cart[0]?.time;
    return time;
  };

  const sum = () => {
    let sum = 0;
    carts.map((cart) => {
      return (sum += cart.price);
    });
    return sum;
  };
  return (
    <div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
      <div>
        <Button style={{ float: 'right', marginRight: '2em' }} className="returnToList" onClick={() => navigate('/')}>
          Back <IoReturnDownBackOutline />
        </Button>
      </div>
      <div className="cartDate">cart created {moment(new Date(handleTime())).format('DD/MM/YYYY hh:mm:ss')}</div>
      <div style={{ float: 'left', margin: '1em' }}>
        <Confirm
          icon={<BsTrash />}
          title={`Are you sure ?`}
          body={`You won't be able to revert deleted item!`}
          confirm="Yes delete it"
          cancelColor="success"
          confirmColor="danger"
          buttonName="Delete"
          itemDeleteBtn="cartDeleteBtn"
          handleClick={() => {
            handleDelete(id);
          }}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>picture</th>
            <th>title</th>
            <th>{`price \u20AC`}</th>
          </tr>
        </thead>
        {carts.map((item, index) => {
          return (
            <tbody key={item.id + index}>
              <tr>
                <td>{index + 1}</td>
                <td>
                  <img src={item.pic} alt="" width="50" height="50" />
                </td>
                <td>{item.title}</td>
                <td>{`${item.price} \u20AC`}</td>
              </tr>
            </tbody>
          );
        })}
        <tbody>
          <tr>
            <td> Total</td>
            <td></td>
            <td> {` ${carts.length} pcs `}</td>
            <td> {` ${sum()} \u20AC `}</td>
          </tr>
        </tbody>
      </Table>
      <Button className="buyCart" onClick={() => handleBuy()}>
        Buy
      </Button>
    </div>
  );
};
export default Cart;
