import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AiOutlineLock } from 'react-icons/ai';
import { BsFillBagFill } from 'react-icons/bs';
import { AiOutlineUnlock } from 'react-icons/ai';
import logInService from '../../services/login';
import Image from 'react-bootstrap/Image';
import { FaTasks } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { MdContactSupport } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../services/currenUser';
import { BsCart4 } from 'react-icons/bs';
import { RiFileHistoryFill } from 'react-icons/ri';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

function NavBar({ image, itemInCart }) {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const handleLockOut = () => {
    logInService.logout();
  };
  const handleCart = () => {
    navigate('/cartList');
  };
  return (
    <Navbar bg="light" expand="sm">
      <Container fluid>
        <Navbar.Brand className="navBarHeader">Leebstore </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={Link} to="/contact">
              Contact <MdContactSupport />
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Shopping <BsFillBagFill />
            </Nav.Link>

            {!currentUser && (
              <div className="links">
                <Nav.Link as={Link} to="/signIn">
                  Sign in <AiOutlineLock />
                </Nav.Link>
              </div>
            )}
          </Nav>
          {currentUser && itemInCart && (
            <div className="me-2" aria-label="Search">
              <Stack direction="row" spacing={2} className="avatarButton" onClick={() => handleCart()}>
                <Avatar sx={{ width: 40, height: 40, bgcolor: green[900], fontSize: '1em' }}>
                  <BsCart4 /> {itemInCart}
                </Avatar>
              </Stack>
            </div>
          )}

          {currentUser && (
            <div className="me-2" aria-label="Search">
              <NavDropdown
                className="me-5"
                title={image !== '' ? <Image src={image} alt="" style={{ width: '2em' }} roundedCircle /> : <MdAccountCircle style={{ fontSize: '2em' }} />}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item as={Link} to="/accounts">
                  Account <MdAccountCircle style={{ fontSize: '1.5em' }} />
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/itemList">
                  My items <FaTasks />
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cartsListHistory">
                  Review your order history <RiFileHistoryFill />
                </NavDropdown.Item>
                <button className="lockOut" onClick={() => handleLockOut()}>
                  Lock out <AiOutlineUnlock />
                </button>
              </NavDropdown>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
