import { Bell, Heart, MapPin, Search, ShoppingCart, User } from 'lucide-react';
import React, { useState } from 'react';
import { Button, Container, Dropdown, Form, Nav, Navbar } from 'react-bootstrap';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar py-1">
        <Container>
          <div className="d-flex justify-content-between align-items-center text-muted">
            <div className="d-flex align-items-center">
              <MapPin size={16} className="me-1" />
              <span>Enviar a Capital Federal</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <a href="#" className="text-decoration-none text-muted">Vender</a>
              <a href="#" className="text-decoration-none text-muted">Ayuda</a>
              <a href="#" className="text-decoration-none text-muted">Crear cuenta</a>
              <a href="#" className="text-decoration-none text-muted">Ingresá</a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <Navbar className="navbar-ml" expand="lg">
        <Container>
          <Navbar.Brand href="#" className="fw-bold text-ml-blue fs-3">
            MercadoLibre
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <div className="flex-grow-1 mx-4 d-none d-lg-block">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar productos, marcas y más..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="me-0"
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              />
              <Button 
                variant="outline-secondary" 
                style={{ 
                  borderTopLeftRadius: 0, 
                  borderBottomLeftRadius: 0,
                  borderLeft: 'none'
                }}
              >
                <Search size={20} />
              </Button>
            </Form>
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-3">
              <Nav.Link href="#" className="d-flex align-items-center text-dark">
                <Heart size={20} className="me-1" />
                <span className="d-none d-md-inline">Favoritos</span>
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center text-dark">
                <Bell size={20} className="me-1" />
                <span className="d-none d-md-inline">Notificaciones</span>
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center text-dark position-relative">
                <ShoppingCart size={20} className="me-1" />
                <span className="d-none d-md-inline">Carrito</span>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="link" className="text-dark text-decoration-none border-0 bg-transparent">
                  <User size={20} className="me-1" />
                  <span className="d-none d-md-inline">Mi cuenta</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Mi perfil</Dropdown.Item>
                  <Dropdown.Item href="#">Mis compras</Dropdown.Item>
                  <Dropdown.Item href="#">Mis ventas</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;