import Shopping from './pages/Shopping';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  const { currentUser } = useCurrentUser();
  return (
    <BrowserRouter>
      <div className="App">
        <NewNavBar />
        <div className="content">
          <Routes>
            <Route extact path="/" element={<Shopping />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/contact" element={<Contact />} />
            {currentUser && <Route path="/items/:id" element={<EditItem />} />}
            {currentUser && <Route path="/itemList" element={<ItemList />} />}
            {currentUser && <Route path="/accounts" element={<Account />} />}
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
    </BrowserRouter>
  );
}

export default App;
