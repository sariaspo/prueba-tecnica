import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Llamada a tu servidor NestJS
    axios.get('http://localhost:3000/countries')
      .then(res => setCountries(res.data))
      .catch(err => console.error("Error conectando al backend:", err));
  }, []);

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Navbar bg="dark" variant="dark" className="mb-4 shadow">
        <Container>
          <Navbar.Brand>🌎 Explorador de Países</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row>
          {countries.map((c, i) => (
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