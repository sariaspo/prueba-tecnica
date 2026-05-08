import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Navbar, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [sortType, setSortType] = useState(''); // Estado para el tipo de orden

  useEffect(() => {
    axios.get('http://localhost:3000/countries')
      .then(res => setCountries(res.data))
      .catch(err => console.error(err));
  }, []);

  // Lógica de ordenamiento
  const sortedCountries = [...countries].sort((a, b) => {
    if (sortType === 'asc') return a.nombre.localeCompare(b.nombre);
    if (sortType === 'desc') return b.nombre.localeCompare(a.nombre);
    if (sortType === 'pop-high') return b.poblacion - a.poblacion;
    if (sortType === 'pop-low') return a.poblacion - b.poblacion;
    return 0;
  });

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Navbar bg="dark" variant="dark" className="mb-4 shadow">
        <Container>
          <Navbar.Brand>🌎 Explorador de Países</Navbar.Brand>
          {/* Selector de Ordenamiento */}
          <Form.Select 
            style={{ width: '250px' }} 
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Ordenar por...</option>
            <option value="asc">Nombre (A - Z)</option>
            <option value="desc">Nombre (Z - A)</option>
            <option value="pop-high">Mayor Población</option>
            <option value="pop-low">Menor Población</option>
          </Form.Select>
        </Container>
      </Navbar>

      <Container>
        <Row>
          {sortedCountries.map((c, i) => (
            <Col key={i} md={4} lg={3} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Img variant="top" src={c.bandera} style={{ height: '150px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title className="h6">{c.nombre}</Card.Title>
                  <Card.Text className="small text-muted">
                    <strong>Capital:</strong> {c.capital}<br/>
                    <strong>Población:</strong> {c.poblacion.toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;