import React, { useState, useEffect } from 'react';
import { Carousel, Container, Button } from 'react-bootstrap';

const OfferCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const offers = [
    {
      id: 1,
      title: "Hasta 50% OFF en Tecnología",
      description: "Los mejores productos tech al mejor precio",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      buttonText: "Ver ofertas",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Moda de temporada",
      description: "Renová tu estilo con las últimas tendencias",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      buttonText: "Comprar ahora",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "Hogar y decoración",
      description: "Transformá tu espacio con nuestras ofertas",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      buttonText: "Descubrir",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [offers.length]);

  return (
    <div className="bg-ml-yellow py-4">
      <Container>
        <Carousel 
          activeIndex={index} 
          onSelect={handleSelect}
          className="rounded overflow-hidden"
          style={{ height: '300px' }}
        >
          {offers.map((offer) => (
            <Carousel.Item key={offer.id}>
              <div 
                className="d-flex align-items-center position-relative"
                style={{ 
                  height: '300px',
                  background: offer.gradient,
                  overflow: 'hidden'
                }}
              >
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
                <Container className="position-relative">
                  <div className="row align-items-center h-100">
                    <div className="col-md-6 text-white">
                      <h2 className="display-5 fw-bold mb-3">{offer.title}</h2>
                      <p className="fs-5 mb-4">{offer.description}</p>
                      <Button variant="light" size="lg" className="fw-semibold">
                        {offer.buttonText}
                      </Button>
                    </div>
                    <div className="col-md-6 d-none d-md-block">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="img-fluid rounded"
                        style={{ maxHeight: '250px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </Container>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default OfferCarousel;