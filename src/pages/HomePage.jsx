import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck, faFilter } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard';
import styles from './HomePage.module.css';
import axios from 'axios';

function HomePage() { // funzione che implementa la ricerca filtrata 
  const API_URL = 'http://172.20.28.102/wp-json/wc/v1/';
  const CONSUMER_KEY = 'ck_136c17cfa88da5e422e238bb1a7acf77fc66fcd6';
  const CONSUMER_SECRET = 'cs_073f41922106c51b6f8e9cebfff83ead24c7b7ba';

  const woocommerceApi = axios.create({
      baseURL: API_URL,
      auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET,
      },
  });

  const fetchProducts = async () => {
    try {
        const response = await woocommerceApi.get('/products');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
  onload = () => {
    fetchProducts();
  };

  const sampleProducts = products;
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
        <Container> {/* contenitore foto e barra di ricerca*/}
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
