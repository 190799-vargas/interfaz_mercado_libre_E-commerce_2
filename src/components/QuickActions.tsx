import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Zap, Gift, Percent, Star, Clock, Target } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: "Ofertas del día",
      description: "Hasta 70% OFF",
      icon: Zap,
      bgColor: "bg-danger",
      textColor: "text-danger"
    },
    {
      title: "Cupones",
      description: "Descuentos exclusivos",
      icon: Gift,
      bgColor: "bg-primary",
      textColor: "text-primary"
    },
    {
      title: "Descuentos",
      description: "Hasta 50% OFF",
      icon: Percent,
      bgColor: "bg-warning",
      textColor: "text-warning"
    },
    {
      title: "Recomendados",
      description: "Para ti",
      icon: Star,
      bgColor: "bg-success",
      textColor: "text-success"
    },
    {
      title: "Últimos días",
      description: "Ofertas por tiempo limitado",
      icon: Clock,
      bgColor: "bg-info",
      textColor: "text-info"
    },
    {
      title: "Destacados",
      description: "Lo más vendido",
      icon: Target,
      bgColor: "bg-secondary",
      textColor: "text-secondary"
    }
  ];

  return (
    <Container className="py-4">
      <h2 className="mb-4 fw-bold">Acciones rápidas</h2>
      <Row>
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Col key={action.title} xs={6} md={4} lg={2} className="mb-3">
              <Card className="card-hover text-center border-0 h-100" style={{ cursor: 'pointer' }}>
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className={`${action.bgColor} rounded-circle d-flex align-items-center justify-content-center mb-3`}
                       style={{ width: '48px', height: '48px' }}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <Card.Title className={`fs-6 mb-1 ${action.textColor}`}>
                    {action.title}
                  </Card.Title>
                  <small className="text-muted">
                    {action.description}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default QuickActions;