import React, { useState } from 'react';
import { Card, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <Card className="h-100 rounded-4 d-flex flex-column">
      <Card.Img
        className="rounded-top-4"
        variant="top"
        src={product.image}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column h-100">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <Card.Title className="mb-0">{product.name}</Card.Title>
          <span className="badge bg-primary">{product.category}</span>
        </div>
        <Card.Text>{product.description.trim()}</Card.Text>
        <div className="mt-auto d-flex flex-column justify-content-between">
          <InputGroup className="mb-2 d-flex justify-content-end">
            <Button
              className="bg-dark text-light border-0 rounded-5"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
            <InputGroup.Text className="text-center border-0 px-3">
              {quantity}
            </InputGroup.Text>
            <Button
              className="bg-dark text-light border-0 rounded-5"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </InputGroup>
          <Card.Text className="text-muted lead mb-3">${product.price}</Card.Text>
          <Button variant="primary" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
