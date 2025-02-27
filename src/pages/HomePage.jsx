import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck, faFilter } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard';
import styles from './HomePage.module.css';
import { categories, sampleProducts } from '../data/products';
import ButtonComponent from '../components/ui/ButtonComponent';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (category === 'All') {
        return ['All'];
      }

      const newCategories = prev.filter(c => c !== 'All');
      if (prev.includes(category)) {
        const filtered = newCategories.filter(c => c !== category);
        return filtered.length === 0 ? ['All'] : filtered;
      } else {
        return [...newCategories, category];
      }
    });
  };

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.includes('All') || selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className={styles.heroSection}>
        <Container>
          <div className="text-center text-light">
            <h1 className="display-3 fw-bold mb-3">La Tua Pausa Pranzo Perfetta</h1>
            <p className="lead fs-3 opacity-75">
              Scopri i nostri prodotti freschi e deliziosi
            </p>
            <Col md={6} className='mx-auto pt-3'>
            <InputGroup className='my-2'>
              <Form.Control
                className='py-1 rounded-5 me-2'
                placeholder="Ricerca prodotti"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
              <Button className="px-3 py-2 bg-light text-dark border-0 rounded-5">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup>
            </Col>
          </div>
        </Container>
      </div>

      <div className='bg-dark pt-5'>
        <Container className="mt-5">
          <div className="mb-5 pb-5">
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredProducts.map(product => (
                <Col key={product.id} className="d-flex">
                  <div className="transition-transform hover-lift w-100">
                    <ProductCard product={product} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
