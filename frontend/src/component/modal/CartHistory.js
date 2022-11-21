import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import services from '../../services/cartsService';
import Table from 'react-bootstrap/Table';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import AlertComponent from '../Alert/AlertComponent';

const CartHistory = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [carts, setCart] = useState([]);
  const url = 'http://localhost:3001/api/carts';
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
        <Button style={{ float: 'right', marginRight: '2em' }} className="returnToList" onClick={() => navigate('/cartsListHistory')}>
          Back <IoReturnDownBackOutline />
        </Button>
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
    </div>
  );
};
export default CartHistory;
