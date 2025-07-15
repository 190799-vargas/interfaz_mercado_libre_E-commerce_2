import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Star, Heart, Truck, Shield } from 'lucide-react';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  freeShipping: boolean;
  fullPayment?: boolean;
  isLiked?: boolean;
  store?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  image,
  freeShipping,
  fullPayment,
  isLiked = false,
  store
}) => {
  return (
    <Card className="card-hover h-100 border-0 shadow-sm">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={image} 
          alt={title}
          className="product-image"
        />
        {discount && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            {discount}% OFF
          </Badge>
        )}
        <Button 
          variant="light" 
          size="sm"
          className="position-absolute top-0 end-0 m-2 rounded-circle p-2"
          style={{ width: '40px', height: '40px' }}
        >
          <Heart size={16} className={isLiked ? 'text-danger' : 'text-muted'} />
        </Button>
        {freeShipping && (
          <Badge bg="success" className="position-absolute bottom-0 start-0 m-2">
            <Truck size={12} className="me-1" />
            Envío gratis
          </Badge>
        )}
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 mb-2 text-truncate" style={{ minHeight: '2.5rem' }}>
          {title}
        </Card.Title>
        
        <div className="d-flex align-items-center mb-2">
          <div className="d-flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(rating) ? 'text-warning' : 'text-muted'}
                fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <small className="text-muted ms-1">({reviews})</small>
        </div>
        
        <div className="mb-2">
          {originalPrice && (
            <small className="text-muted text-decoration-line-through d-block">
              ${originalPrice.toLocaleString()}
            </small>
          )}
          <h5 className="mb-0 fw-bold">
            ${price.toLocaleString()}
          </h5>
        </div>
        
        {fullPayment && (
          <small className="text-success mb-2">
            Hasta 12 cuotas sin interés
          </small>
        )}
        
        {store && (
          <small className="text-muted mb-2 d-flex align-items-center">
            <Shield size={12} className="me-1" />
            {store}
          </small>
        )}
        
        <Button variant="primary" className="btn-ml-primary mt-auto">
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;