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
import services from './services/registerService';
import cartService from './services/cartsService';
function App() {
  const { currentUser } = useCurrentUser();
  const [image, setImage] = useState('');
  const [itemInCart, setItemInCart] = useState(0);
  const url = `/api/users`;
  const [cartdata, setCartData] = useState({});
  const [error, setError] = useState(null);
  const cartUrl = '/api/carts';
  const handleCartAdd = () => {
    setItemInCart(itemInCart + 1);
  };
  useEffect(() => {
    services.getUser(url).then((res) => {
      setImage(res.pic);
    });

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
        <NewNavBar image={image} itemInCart={itemInCart} />
        <div className="content">
          <Routes>
            <Route extact path="/" element={<Shopping handleCartAdd={handleCartAdd} setItemInCart={setItemInCart} setError={setError} cartdata={cartdata} error={error} setCartData={setCartData} />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/contact" element={<Contact />} />
            {currentUser && <Route path="/items/:id" element={<EditItem />} />}
            {currentUser && <Route path="/itemList" element={<ItemList />} />}
            {currentUser && <Route path="/accounts" element={<Account image={image} setImage={setImage} newImage={image} />} />}
            {currentUser && <Route path="/cartList" element={<CartList />} />}
            {currentUser && <Route path="/cartsListHistory" element={<CartsListHistory />} />}
            {currentUser && <Route path="/cartList/:id" element={<Cart setItemInCart={setItemInCart} />} />}
            {currentUser && <Route path="/cartsListHistory/:id" element={<CartHistory />} />}
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
