import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { VscListFlat } from 'react-icons/vsc';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';

const NavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="navBarBtn" onClick={handleShow}>
        <VscListFlat style={{ color: '#b7b7b7' }} />
      </button>
      <Offcanvas show={show} onHide={handleClose} style={{ width: '8em' }}>
        <Offcanvas.Header>
          <Offcanvas.Title>
            <header className="navBar-header">MyProject</header>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="navbar">
            <div className="links">
              <Link to="/" onClick={handleClose}>
                Home <AiOutlineHome style={{ color: '#b7b7b7' }} />
              </Link>
            </div>
            <div className="links">
              <Link to="/signIn" onClick={handleClose}>
                Sign in <AiOutlineLock style={{ color: '#ff0000' }} />
              </Link>
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
