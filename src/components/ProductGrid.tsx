import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';

const ProductGrid: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    min_price: undefined as number | undefined,
    max_price: undefined as number | undefined,
    condition: undefined as string | undefined,
    free_shipping: undefined as boolean | undefined,
    ordering: '-created_at'
  });

  const { products, loading, error } = useProducts(filters);

  const filterOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'tech', label: 'Tecnología' },
    { value: 'fashion', label: 'Moda' },
    { value: 'home', label: 'Hogar' },
    { value: 'sports', label: 'Deportes' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Más relevantes' },
    { value: 'price-low', label: 'Menor precio' },
    { value: 'price-high', label: 'Mayor precio' },
    { value: 'newest', label: 'Más nuevos' },
    { value: 'best-seller', label: 'Más vendidos' }
  ];

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    let ordering = '-created_at';
    
    switch (newSortBy) {
      case 'price-low':
        ordering = 'price';
        break;
      case 'price-high':
        ordering = '-price';
        break;
      case 'newest':
        ordering = '-created_at';
        break;
      case 'best-seller':
        ordering = '-sales_count';
        break;
      default:
        ordering = '-created_at';
    }
    
    setFilters(prev => ({ ...prev, ordering }));
  };

  return (
    <div className="bg-light py-4">
      <Container>
        <Row>
          {/* Sidebar */}
          <Col lg={3} className="mb-4">
            <Card className="sticky-top">
              <Card.Header className="bg-white">
                <h5 className="mb-0 d-flex align-items-center">
                  <Filter size={20} className="me-2" />
                  Filtros
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Categorías</h6>
                  {filterOptions.map((filter) => (
                    <Form.Check
                      key={filter.value}
                      type="radio"
                      name="category"
                      id={filter.value}
                      label={filter.label}
                      checked={selectedFilter === filter.value}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="mb-2"
                    />
                  ))}
                </div>
                
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Precio</h6>
                  <Form.Range className="mb-2" />
                  <div className="d-flex justify-content-between small text-muted">
                    <span>$0</span>
                    <span>$2,000,000</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Envío</h6>
                  <Form.Check
                    type="checkbox"
                    id="free-shipping"
                    label="Envío gratis"
                  />
                </div>
                
                <div>
                  <h6 className="fw-semibold mb-3">Condición</h6>
                  <Form.Check
                    type="checkbox"
                    id="new"
                    label="Nuevo"
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    id="used"
                    label="Usado"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Main Content */}
          <Col lg={9}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0">Productos destacados</h2>
              <div className="d-flex align-items-center">
                <SlidersHorizontal size={16} className="me-2 text-muted" />
                <Form.Select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            
            {loading ? (
              <Row>
                {[...Array(6)].map((_, index) => (
                  <Col key={index} sm={6} lg={4} className="mb-4">
                    <Card>
                      <div className="placeholder-glow">
                        <div className="placeholder w-100" style={{ height: '200px' }}></div>
                      </div>
                      <Card.Body>
                        <div className="placeholder-glow">
                          <div className="placeholder col-7"></div>
                          <div className="placeholder col-4"></div>
                          <div className="placeholder col-6"></div>
                          <div className="placeholder col-8"></div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : error ? (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            ) : (
              <Row>
                {products.map((product) => (
                  <Col key={product.id} sm={6} lg={4} className="mb-4">
                    <ProductCard 
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      originalPrice={product.original_price}
                      discount={product.discount_percentage}
                      rating={product.average_rating}
                      reviews={product.review_count}
                      image={product.primary_image || "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                      freeShipping={product.free_shipping}
                      fullPayment={true}
                      store={product.seller_name}
                    />
                  </Col>
                ))}
              </Row>
            )}
            
            {!loading && !error && products.length > 0 && (
              <div className="text-center mt-4">
                <Button variant="primary" size="lg" className="btn-ml-primary">
                  Cargar más productos
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductGrid;