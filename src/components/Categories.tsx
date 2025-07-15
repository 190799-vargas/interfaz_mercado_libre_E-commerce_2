import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import * as LucideIcons from 'lucide-react';
import { usePopularCategories } from '../hooks/useCategories';
import { useProductsByCategory } from '../hooks/useProducts';

const Categories: React.FC = () => {
  const { categories, loading, error } = usePopularCategories();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const { products } = useProductsByCategory(selectedCategory || '');

  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    console.log(`Productos de la categoría ${categorySlug}:`, products);
  };

  if (loading) {
    return (
      <Container className="py-4">
        <h2 className="mb-4 fw-bold">Categorías</h2>
        <Row>
          {[...Array(12)].map((_, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={2} className="mb-3">
              <Card className="text-center border-0">
                <Card.Body>
                  <div className="placeholder-glow">
                    <div className="placeholder rounded-circle mx-auto mb-2" style={{width: '48px', height: '48px'}}></div>
                    <div className="placeholder col-8 mx-auto"></div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <h2 className="mb-4 fw-bold">Categorías</h2>
        <div className="text-center py-5">
          <p className="text-danger">{error}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4 fw-bold">Categorías</h2>
      <Row>
        {categories.map((category) => {
          const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.Package;
          return (
            <Col key={category.name} xs={6} sm={4} md={3} lg={2} className="mb-3">
              <Card 
                className="category-card text-center border-0 h-100"
                onClick={() => handleCategoryClick(category.slug)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="d-flex flex-column align-items-center">
                  <div 
                    className={`rounded-circle d-flex align-items-center justify-content-center mb-2 ${category.color}`}
                    style={{ width: '48px', height: '48px' }}
                  >
                    <IconComponent size={24} />
                  </div>
                  <Card.Title className="fs-6 mb-1 text-ml-blue">{category.name}</Card.Title>
                  <small className="text-muted">{category.product_count} productos</small>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Categories;