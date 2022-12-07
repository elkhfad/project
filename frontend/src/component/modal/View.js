import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import services from '../../services/cartsService';
import { useGetCartList } from '../control/useGetCardList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const View = () => {
  const cartUrl = '/api/carts/all';
  const { cartdata } = useGetCartList(cartUrl);
  const { id } = useParams();
  const [carts, setCarts] = useState([]);
  const url = '/api/carts';

  const [cart, setCart] = useState({
    buyItems: [{ buyItem: '', amount: 0, price: 0, _id: '' }],
    id: '',
    time: '',
    user: '',
    wish: false,
    address: '',
  });
  useEffect(() => {
    services.getById(url, id).then((res) => {
      setCarts(res.data);
      setCart(
        cartdata.find((cart) => {
          return cart.id === id;
        })
      );
    });
  }, [id, url, cart, cartdata]);

  const TAX_RATE = 0.22;

  const subtotal = (items) => {
    return items
      ?.map(({ price, amount }) => {
        return price * amount;
      })
      .reduce((sum, i) => sum + i, 0);
  };

  return (
    <div>
      <div>
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
                  <TableRow key={item._id + index}>
                    <TableCell>{carts?.filter((p) => p.id === item.buyItem).shift()?.title}</TableCell>
                    <TableCell align="left">{item.amount}</TableCell>
                    <TableCell align="right">
                      <img src={carts?.filter((p) => p.id === item.buyItem).shift()?.pic} alt="" width="50" height="50" />
                    </TableCell>
                    <TableCell align="right">
                      {item.price} {'\u20AC'}
                    </TableCell>
                    <TableCell align="right">
                      {(item?.price * item.amount).toFixed(2)} {'\u20AC'}
                    </TableCell>
                  </TableRow>
                ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{subtotal(cart?.buyItems?.filter((item) => item !== null))?.toFixed(2)}</TableCell>
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
      </div>
    </div>
  );
};
export default View;
