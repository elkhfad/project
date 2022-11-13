import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AiOutlineLock } from 'react-icons/ai';
import { BsFillBagFill } from 'react-icons/bs';
import { AiOutlineUnlock } from 'react-icons/ai';
import { useAvatar, useCurrentUser } from '../../services/currenUser';
import logInService from '../../services/login';
import Image from 'react-bootstrap/Image';
import { FaTasks } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

function NewNavBar() {
  const { currentUser } = useCurrentUser();
  const { image } = useAvatar();
  const handleLockOut = () => {
    logInService.logout();
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand className="navBarHeader">Leebstore</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
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
                <NavDropdown.Item as={Link} to="itemList">
                  My items <FaTasks />
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

export default NewNavBar;
