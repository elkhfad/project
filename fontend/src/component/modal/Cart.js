import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import services from '../../services/cartsService';
import Table from 'react-bootstrap/Table';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import Button from 'react-bootstrap/Button';

const Cart = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [carts, setCart] = useState([]);
  const url = 'http://localhost:3001/api/carts';

  useEffect(() => {
    services.getById(url, id).then((res) => {
      setCart(res.data);
    });
  }, [id, url]);

  const sum = () => {
    let sum = 0;
    carts.map((cart) => (sum += cart.price));
    return sum;
  };
  return (
    <div>
      <Button style={{ float: 'right', marginRight: '2em' }} className="returnToList" onClick={() => navigate('/')}>
        Back <IoReturnDownBackOutline />
      </Button>
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
            <tbody key={item.id}>
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
export default Cart;
