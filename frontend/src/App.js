import Shopping from './pages/Shopping';
import { HashRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import EditItem from './component/modal/EditItem';
import NewNavBar from './component/modal/NavBar';
import ItemList from './pages/ItemList';
import AutoLogOut from './component/autoLogOut/AutoLogOut';
import Account from './pages/Account';
import { useCurrentUser } from './services/currenUser';
import CartList from './component/modal/cartsList';
import Cart from './component/modal/Cart';
import CartsListHistory from './component/modal/cartsListHistory';
import CartHistory from './component/modal/CartHistory';
import Contact from './pages/Contact';
import { useEffect, useState } from 'react';
import cartService from './services/cartsService';
import PrivateRoute from './component/autoLogOut/PrivateRoute';
import CartBuyStepper from './component/modal/CartBuyStepper';
function App() {
  const { currentUser } = useCurrentUser();
  const [itemInCart, setItemInCart] = useState(0);
  const url = `/api/users`;
  const [cartdata, setCartData] = useState({});
  const [error, setError] = useState(null);
  const cartUrl = '/api/carts';
  const handleCartAdd = () => {
    setItemInCart(itemInCart + 1);
  };
  useEffect(() => {
    const getWishList = () => {
      cartService
        .getAllCartByUser(cartUrl)
        .then((res) => {
          if (!res.status === 'OK') {
            throw Error('could not load data');
          }
          const wishCard = res.find((r) => {
            return r.wish === true;
          });
          setCartData(wishCard);
          setItemInCart(wishCard?.buyItems.length);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    };
    getWishList();
  }, [currentUser, setItemInCart, url]);
  return (
    <HashRouter basename="/">
      <div className="App">
        <NewNavBar itemInCart={itemInCart} />
        <div className="content">
          <Routes>
            <Route extact path="/" element={<Shopping handleCartAdd={handleCartAdd} setItemInCart={setItemInCart} setError={setError} cartdata={cartdata} error={error} setCartData={setCartData} />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/items/:id"
              element={
                <PrivateRoute>
                  <EditItem />
                </PrivateRoute>
              }
            />
            <Route
              path="/itemList"
              element={
                <PrivateRoute>
                  <ItemList />
                </PrivateRoute>
              }
            />
            <Route
              path="/accounts"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />

            <Route
              path="/cartList"
              element={
                <PrivateRoute>
                  <CartList />
                </PrivateRoute>
              }
            />
            <Route
              path="/cartsListHistory"
              element={
                <PrivateRoute>
                  <CartsListHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/cartList/:id"
              element={
                <PrivateRoute>
                  <Cart setItemInCart={setItemInCart} itemInCart={itemInCart} />
                </PrivateRoute>
              }
            />
            <Route
              path="/cartList/shipping/:id"
              element={
                <PrivateRoute>
                  <CartBuyStepper />
                </PrivateRoute>
              }
            />
            <Route
              path="/cartsListHistory/:id"
              element={
                <PrivateRoute>
                  <CartHistory />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <div>
          {(() => {
            if (sessionStorage.getItem('currenUser') !== null) {
              return <AutoLogOut />;
            } else {
              sessionStorage.removeItem('_expiredTime');
              return;
            }
          })()}
        </div>
      </div>
      <footer> &copy; {new Date().getFullYear()} Copyright: </footer>
    </HashRouter>
  );
}

export default App;
