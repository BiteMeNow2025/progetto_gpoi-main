import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

// TODO: Remove this in production - import from a shared config
const DEV_MODE = true;

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Hide navigation on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
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
                  <FontAwesomeIcon icon={faShoppingCart} /> Cart
                </Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : (
              user ? (
                <>
                  <Nav.Link as={Link} to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} /> Cart
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
