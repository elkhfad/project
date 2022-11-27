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

function App() {
  const { currentUser } = useCurrentUser();
  const [image, setImage] = useState('');
  const [itemInCart, setItemInCart] = useState(0);
  const url = `/api/users`;

  const newImage = () => {
    services.getUser(url).then((res) => {
      setImage(res.pic);
    });
  };
  const handleCartAdd = () => {
    setItemInCart(itemInCart + 1);
  };
  useEffect(() => {
    if (currentUser && setImage(currentUser?.pic));
  }, [currentUser]);
  return (
    <HashRouter basename="/">
      <div className="App">
        <NewNavBar image={image} setImage={setImage} itemInCart={itemInCart} />
        <div className="content">
          <Routes>
            <Route extact path="/" element={<Shopping handleCartAdd={handleCartAdd} setItemInCart={setItemInCart} />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/contact" element={<Contact />} />
            {currentUser && <Route path="/items/:id" element={<EditItem />} />}
            {currentUser && <Route path="/itemList" element={<ItemList />} />}
            {currentUser && <Route path="/accounts" element={<Account image={image} setImage={setImage} newImage={newImage} />} />}
            {currentUser && <Route path="/cartList" element={<CartList />} />}
            {currentUser && <Route path="/cartsListHistory" element={<CartsListHistory />} />}
            {currentUser && <Route path="/cartList/:id" element={<Cart />} />}
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
