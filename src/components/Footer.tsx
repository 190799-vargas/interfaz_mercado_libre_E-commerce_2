import {
  Clock,
  CreditCard,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Shield,
  Truck,
  Twitter,
  Youtube
} from 'lucide-react';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Acerca de",
      links: [
        "Sobre MercadoLibre",
        "Investor relations",
        "Tendencias",
        "Sustentabilidad",
        "Careers"
      ]
    },
    {
      title: "Otros sitios",
      links: [
        "Developers",
        "Mercado Pago",
        "Mercado Shops",
        "Mercado Envíos",
        "Mercado Ads"
      ]
    },
    {
      title: "Ayuda",
      links: [
        "Comprar",
        "Vender",
        "Resolución de problemas",
        "Centro de seguridad",
        "Cómo cuidamos tu privacidad"
      ]
    },
    {
      title: "Redes sociales",
      links: [
        "Facebook",
        "Twitter",
        "Instagram",
        "YouTube",
        "LinkedIn"
      ]
    }
  ];

  const features = [
    {
      icon: CreditCard,
      title: "Pagá como quieras",
      description: "Tarjetas de crédito o débito, efectivo en puntos de pago o cuotas sin interés"
    },
    {
      icon: Shield,
      title: "Comprá con seguridad",
      description: "Protección desde que compras hasta que llega a tu casa"
    },
    {
      icon: Truck,
      title: "Envío gratis desde $6.999",
      description: "Solo por estar registrado en MercadoLibre"
    },
    {
      icon: Clock,
      title: "Soporte 24/7",
      description: "Estamos para ayudarte todos los días"
    }
  ];

  return (
    <footer className="bg-white border-top mt-5">
      {/* Features Section */}
      <div className="bg-light py-4 border-bottom">
        <Container>
          <Row className="g-4">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Col key={feature.title} xs={12} sm={6} lg={3} className="d-flex align-items-start">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3 footer-feature-icon">
                    <IconComponent size={20} className="text-white" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 footer-feature-title">{feature.title}</h6>
                    <p className="text-muted small mb-0 footer-feature-description">{feature.description}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>

      {/* Main Footer */}
      <div className="py-4 border-bottom">
        <Container>
          <Row>
            {footerSections.map((section) => (
              <Col key={section.title} xs={6} md={3} className="mb-4 mb-md-0">
                <h6 className="fw-bold mb-3 footer-section-title">{section.title}</h6>
                <ul className="list-unstyled">
                  {section.links.map((link) => (
                    <li key={link} className="mb-2">
                      <a href="#" className="text-decoration-none text-muted small footer-link">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Contact Section */}
      <div className="bg-light py-3">
        <Container>
          <Row className="g-3">
            <Col xs={12} md={4} className="d-flex align-items-center">
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3"
                   style={{ width: '32px', height: '32px', minWidth: '32px' }}>
                <Phone size={16} className="text-primary" />
              </div>
              <div>
                <small className="text-muted footer-contact-detail">0800-333-3333</small>
              </div>
            </Col>
            <Col xs={12} md={4} className="d-flex align-items-center">
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3"
                   style={{ width: '32px', height: '32px', minWidth: '32px' }}>
                <Mail size={16} className="text-primary" />
              </div>
              <div>
                <div className="fw-bold small">Email</div>
                <small className="text-muted footer-email">ayuda@mercadolibre.com</small>
              </div>
            </Col>
            <Col xs={12} md={4} className="d-flex align-items-center">
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3"
                   style={{ width: '32px', height: '32px', minWidth: '32px' }}>
                <MapPin size={16} className="text-primary" />
              </div>
              <div>
                <div className="fw-bold small">Dirección</div>
                <small className="text-muted footer-address">Buenos Aires, Argentina</small>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Bottom Section */}
      <div className="bg-dark text-white py-3">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6} className="mb-3 mb-md-0">
              <div className="d-flex flex-column flex-md-row align-items-center">
                <h6 className="mb-2 mb-md-0 me-2 fw-bold" style={{ fontSize: '1rem' }}>MercadoLibre</h6>
                <small className="text-muted footer-bottom-text">
                  © 2024 MercadoLibre. Todos los derechos reservados.
                </small>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="d-flex justify-content-center justify-content-md-end gap-3">
                <a href="#" className="text-white-50">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-white-50">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-white-50">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-white-50">
                  <Youtube size={18} />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;