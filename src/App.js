import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SideBar from './component/modal/SideBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SideBar />
        <div className="content">
          <Routes>
            <Route extact path="/" element={<Home />} />
            <Route extact path="/aboutUs" element={<AboutUs />} />
            <Route extact path="/signIn" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
