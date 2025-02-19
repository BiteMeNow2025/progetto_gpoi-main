import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ButtonComponent from './ui/ButtonComponent';

// TODO: Remove this in production - import from a shared config
const DEV_MODE = false;

const Navigation = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  
  // Hide navigation on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <Navbar className='fixed-top' bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FontAwesomeIcon icon="fa-solid fa-code" className="me-2" />
          Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          <Nav>
            {DEV_MODE ? (
              <>
                <Nav.Link as={Link} to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {totalItems > 0 && (
                    <span className="position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {totalItems}
                      </span>
                    </span>
                  )}
                  {' '}Cart
                </Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : (
              user ? (
                <>
                  <Nav.Link as={Link} to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {totalItems > 0 && (
                      <span className="position-relative">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {totalItems}
                        </span>
                      </span>
                    )}
                    {' '}Cart
                  </Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
