import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SiteNavBar from '../SiteNavBar';
import { Link } from 'react-router-dom';
import { AiOutlineLock } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUnlock } from 'react-icons/ai';
import { useCurrentUser } from '../../services/currenUser';
import logInService from '../../services/login';

function NewNavBar() {
  const { currentUser } = useCurrentUser();
  const handleLockOut = () => {
    logInService.logout();
  };
  return (
    <Navbar bg="light" expand="sm">
      {currentUser && <SiteNavBar />}
      <Container fluid>
        <header className="navBar-header">Leebstore</header>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <nav className="navbar">
              <div className="links">
                <Link to="/">
                  Home <AiOutlineHome />
                </Link>
              </div>
              {!currentUser ? (
                <div className="links">
                  <Link to="/signIn">
                    Sign in <AiOutlineLock />
                  </Link>
                </div>
              ) : (
                <button className="lockOut" onClick={() => handleLockOut()}>
                  Lock out <AiOutlineUnlock />
                </button>
              )}
            </nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NewNavBar;
