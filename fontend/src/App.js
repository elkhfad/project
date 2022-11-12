import AboutUs from './pages/AboutUs';
import Shopping from './pages/Shopping';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import EditItem from './component/modal/EditItem';
import NewNavBar from './component/modal/NavBar';
import ItemList from './pages/ItemList';
import AutoLogOut from './component/autoLogOut/AutoLogOut';
import Account from './pages/Account';
import { useCurrentUser } from './services/currenUser';

function App() {
  const { currentUser } = useCurrentUser();
  return (
    <BrowserRouter>
      <div className="App">
        <NewNavBar />
        <div className="content">
          <Routes>
            <Route extact path="/" element={<Shopping />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/signIn" element={<SignIn />} />
            {currentUser && <Route path="/items/:id" element={<EditItem />} />}
            {currentUser && <Route path="/itemList" element={<ItemList />} />}
            {currentUser && <Route path="/accounts" element={<Account />} />}
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
