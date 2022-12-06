import { useParams } from 'react-router-dom';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import AlertComponent from '../Alert/AlertComponent';
import { useGetCartById } from '../control/useGetCardList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const url = '/api/carts';
  const { id } = useParams();
  const { error, data, cart, isPending } = useGetCartById(url, id);
  const navigate = useNavigate();
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
      <div>{isPending && <Spinner animation="border" variant="primary" />}</div>
      <div>{error && <AlertComponent variant="danger" header="You got an error!" text={error} />}</div>

      <Paper>
        <div className="paperCart"></div>
        <div>
          <Button style={{ float: 'right', marginRight: '2em' }} className="returnToList" onClick={() => navigate('/cartsListHistory')}>
            Back <IoReturnDownBackOutline />
          </Button>
        </div>
        <div className="cartHistoryAddress">
          <div className="shippingAddress">
            Shipping Address
            <div className="cartFullName">
              full name: {cart?.address.firstName} {cart?.address.lastName}
            </div>
            <div className="cartEmail">email: {cart?.address.email}</div>
            <div className="cartaddress">street: {cart?.address.street}</div>
            <div className="cartCityAndPostalCode">postal code: {cart?.address.postalCode}</div>
            <div className="cartCityAndPostalCode">city: {cart?.address.city}</div>
          </div>
        </div>
        <div className="cartInformation">Cart information</div>
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
                      <TableCell>{data?.filter((p) => p.id === item.buyItem).shift()?.title}</TableCell>
                      <TableCell align="left">{item.amount}</TableCell>
                      <TableCell align="left">
                        <img src={data?.filter((p) => p.id === item.buyItem).shift()?.pic} alt="" width="50" height="50" />
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
                  <TableCell align="right">
                    {subtotal(cart?.buyItems?.filter((item) => item !== null)).toFixed(2)} {'\u20AC'}
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
        </div>
        <div className="paperBottom"></div>
      </Paper>
    </div>
  );
};
export default Cart;
