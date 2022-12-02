import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import CartAmountUpdateComponent from './CartAmountUpdateComponent';

const Cart = ({ setItemInCart, itemInCart }) => {
  const cartUrl = '/api/carts/all';
  const [isPending, setIsPending] = useState(true);
  const { cartdata, setCartData } = useGetCartList(cartUrl);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [carts, setCarts] = useState([]);
  const url = '/api/carts';
  const urlBuy = '/api/carts/buy';
  const cartWishUrl = '/api/carts/wishlist';
  const [cart, setCart] = useState({
    buyItems: [{ buyItem: '', amount: 0, price: 0, _id: '' }],
    id: '',
    time: '',
    user: '',
    wish: false,
  });
  useEffect(() => {
    services
      .getById(url, id)
      .then((res) => {
        setCarts(res.data);
        setIsPending(false);
        setCart(
          cartdata.find((cart) => {
            return cart.id === id;
          })
        );
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setIsPending(false);
      });
  }, [id, url, cart, cartdata]);
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

  const handleDelete = (id) => {
    services.deleteCart(url, id).then((res) => {
      setItemInCart(0);
      window.location.href = '/';
    });
  };
  const handleAmount = () => {
    services
      .getAllCartByUser(cartUrl)
      .then((res) => {
        if (!res.status === 'OK') {
          throw Error('could not load data');
        }
        setIsPending(false);
        setCartData(res);
        setError(null);
        setCart(
          cartdata.find((cart) => {
            return cart.id === id;
          })
        );
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  const handleTime = () => {
    const time = cart?.time;
    return time;
  };
  const reload = () => {
    window.location.href = '/';
  };
  const deleteItem = async (itemId) => {
    const cartItem = carts?.filter((cart) => {
      return cart.id !== itemId;
    });
    const shoppinCartItems = cart?.buyItems?.filter((item) => {
      return item.buyItem !== itemId;
    });
    const newObject = {
      itemId: itemId,
    };
    cart.buyItems = shoppinCartItems;
    setCarts(cartItem);
    setCart(cartItem);
    setItemInCart(itemInCart - 1);
    await services.removeAndUpdate(cartWishUrl, id, newObject);
  };

  return (
    <div>
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>
      <div>
        <Button style={{ float: 'right', marginRight: '2em' }} className="returnToList" onClick={() => reload()}>
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
              <TableCell align="left">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="right">Picture</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.buyItems
              ?.filter((item) => item !== null)
              .map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{carts?.filter((p) => p.id === item.buyItem).shift()?.title}</TableCell>
                  <TableCell align="left">
                    <CartAmountUpdateComponent unit={item.amount} id={id} itemId={item._id} handleAmount={handleAmount} />
                  </TableCell>
                  <TableCell align="right">
                    <img src={carts?.filter((p) => p.id === item.buyItem).shift()?.pic} alt="" width="50" height="50" />
                  </TableCell>
                  <TableCell align="right">
                    {item.price} {'\u20AC'}
                  </TableCell>
                  <TableCell align="right">
                    {(item?.price * item.amount).toFixed(2)} {'\u20AC'}
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
                          deleteItem(item.buyItem, index);
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
                {subtotal(cart?.buyItems?.filter((item) => item !== null))} {'\u20AC'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">
                {(TAX_RATE * subtotal(cart?.buyItems?.filter((item) => item !== null))).toFixed(2)} {'\u20AC'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {(subtotal(cart?.buyItems?.filter((item) => item !== null)) + subtotal(cart?.buyItems?.filter((item) => item !== null)) * TAX_RATE).toFixed(2)} {'\u20AC'}
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
