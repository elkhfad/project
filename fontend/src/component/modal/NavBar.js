import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SiteNavBar from '../SiteNavBar';
import { Link } from 'react-router-dom';
import { AiOutlineLock } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';

function NewNavBar() {
  return (
    <Navbar bg="light" expand="sm">
      <SiteNavBar />
      <Container fluid>
        <header className="navBar-header">MyProject</header>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <nav className="navbar">
              <div className="links">
                <Link to="/">
                  Home <AiOutlineHome />
                </Link>
              </div>
              <div className="links">
                <Link to="/signIn">
                  Sign in <AiOutlineLock />
                </Link>
              </div>
            </nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NewNavBar;
