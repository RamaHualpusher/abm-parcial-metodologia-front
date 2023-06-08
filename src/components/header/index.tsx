import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import * as React from 'react';

const Header: React.FC = () => {
  // Render
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">ABM</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/personas">Personas</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
