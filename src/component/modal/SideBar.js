import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';
import { AiOutlineLock } from 'react-icons/ai';
import { AiOutlineHome } from 'react-icons/ai';

function SideBar() {
  return (
    <Navbar bg="light" expand="sm">
      <NavBar />
      <Container fluid>
        <header className="navBar-header">MyProject</header>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <div className="navbar">
              <div className="links">
                <Link to="/">
                  Home <AiOutlineHome style={{ color: '#b7b7b7' }} />
                </Link>
              </div>
              <div className="links">
                <Link to="/signIn">
                  Sign in <AiOutlineLock style={{ color: '#ff0000' }} />
                </Link>
              </div>
            </div>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SideBar;
