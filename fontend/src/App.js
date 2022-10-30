import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import EditItem from './component/modal/EditItem';
import NewNavBar from './component/modal/NavBar';
import ItemList from './pages/ItemList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NewNavBar />
        <div className="content">
          <Routes>
            <Route extact path="/" element={<Home />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/items/:id" element={<EditItem />} />
            <Route path="/itemList" element={<ItemList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;