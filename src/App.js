import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SideBar from './component/modal/SideBar';
import EditItem from './component/modal/EditItem';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SideBar />
        <div className="content">
          <Routes>
            <Route extact path="/" element={<Home />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/items/:id" element={<EditItem />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
