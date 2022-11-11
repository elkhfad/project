import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { VscListFlat } from 'react-icons/vsc';
import { FaTasks } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';

const SiteNavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="navBarBtn" onClick={handleShow}>
        <VscListFlat style={{ color: '#b7b7b7' }} />
      </button>
      <Offcanvas show={show} onHide={handleClose} style={{ width: '10em' }}>
        <Offcanvas.Header>
          <Offcanvas.Title>
            <header className="navBar-header">My Leebstore</header>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="navbar">
            <div className="links">
              <Link to="/itemList" onClick={handleClose}>
                Items <FaTasks />
              </Link>
            </div>
            <div className="links">
              <Link to="/accounts" onClick={handleClose}>
                Account <VscAccount />
              </Link>
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SiteNavBar;
