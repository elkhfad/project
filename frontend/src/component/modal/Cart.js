import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import services from '../../services/cartsService';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import AlertComponent from '../Alert/AlertComponent';
import Confirm from './Confirm';
import { BsTrash } from 'react-icons/bs';
import { useGetCartList } from '../control/useGetCardList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Cart = ({ setItemInCart, itemInCart }) => {
  const navigate = useNavigate();
  const cartUrl = '/api/carts/all';
  const [isPending, setIsPending] = useState(true);
  const { cartdata, setCartData } = useGetCartList(cartUrl);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [carts, setCart] = useState([]);
  const url = '/api/carts';
  const urlBuy = '/api/carts/buy';
  const cartWishUrl = '/api/carts/wishlist';
  const cart = cartdata.find((cart) => {
    return cart.id === id;
  });
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
        setItemInCart(0);
        window.location.href = '/';
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const TAX_RATE = 0.22;

  const subtotal = (items) => {
    return items
      ?.map(({ price, amount }) => {
        return price * amount;
      })
      .reduce((sum, i) => sum + i, 0);
  };

  const invoiceSubtotal = subtotal(cart?.buyItems);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  const handleDelete = (id) => {
    services.deleteCart(url, id).then((res) => {
      setItemInCart(0);
      window.location.href = '/';
    });
  };

  const handleTime = () => {
    const time = cart?.time;
    return time;
  };

  const deleteItem = async (itemId) => {
    const cartItem = carts.filter((cart) => {
      return cart.id !== itemId;
    });
    const newObject = {
      itemId: itemId,
    };
    setCart(cartItem);
    setItemInCart(itemInCart - 1);
    await services.removeAndUpdate(cartWishUrl, id, newObject);
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
      <div className="cartDate">cart created {handleTime()} </div>
      <TableContainer component={Paper} style={{ width: '80%', margin: '0 auto', marginTop: '2em', marginBottom: '2em' }}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Picture</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.map((item, index) => (
              <TableRow key={item.id + index}>
                <TableCell>{item.title}</TableCell>
                <TableCell align="right">{cart.buyItems[index]?.amount} pcs</TableCell>
                <TableCell align="right">
                  <img src={item.pic} alt="" width="50" height="50" />
                </TableCell>
                <TableCell align="right">
                  {item.price} {'\u20AC'}
                </TableCell>
                <TableCell align="right">
                  {(cart.buyItems[index]?.price * cart.buyItems[index]?.amount).toFixed(2)} {'\u20AC'}
                </TableCell>
                <TableCell align="right">
                  {carts.length > 1 && (
                    <Confirm
                      icon={<BsTrash />}
                      title={`Are you sure ?`}
                      body={`You won't be able to revert deleted item!`}
                      confirm="Yes delete it"
                      cancelColor="success"
                      confirmColor="danger"
                      buttonName="Delete"
                      itemDeleteBtn="itemDeleteBtn"
                      handleClick={() => {
                        deleteItem(item.id, index);
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">
                {invoiceSubtotal} {'\u20AC'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">
                {invoiceTaxes.toFixed(2)} {'\u20AC'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {invoiceTotal.toFixed(2)} {'\u20AC'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="cartButtons">
        <div>
          <Button className="buyCart" onClick={() => handleBuy()}>
            Buy
          </Button>
        </div>
        <div>
          <Confirm
            icon={<BsTrash />}
            title={`Are you sure ?`}
            body={`You won't be able to revert deleted cart! ${handleTime()}`}
            confirm="Yes delete it"
            cancelColor="success"
            confirmColor="danger"
            buttonName="Delete"
            itemDeleteBtn="wholecartDeleteBtn"
            handleClick={() => {
              handleDelete(id);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Cart;
