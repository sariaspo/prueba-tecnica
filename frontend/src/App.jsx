import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Navbar, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [sortType, setSortType] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Estado para búsqueda
  const [regionFilter, setRegionFilter] = useState(''); // Estado para región

  useEffect(() => {
    axios.get('http://localhost:3000/countries')
      .then(res => setCountries(res.data))
      .catch(err => console.error(err));
  }, []);

  // --- LÓGICA DE FILTRADO Y BÚSQUEDA ---
  const filteredCountries = countries.filter(c => {
    const matchesName = c.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === '' || c.region === regionFilter;
    return matchesName && matchesRegion;
  });

  // --- LÓGICA DE ORDENAMIENTO ---
  const finalDisplay = [...filteredCountries].sort((a, b) => {
    if (sortType === 'asc') return a.nombre.localeCompare(b.nombre);
    if (sortType === 'desc') return b.nombre.localeCompare(a.nombre);
    if (sortType === 'pop-high') return b.poblacion - a.poblacion;
    if (sortType === 'pop-low') return a.poblacion - b.poblacion;
    return 0;
  });

  // Extraer regiones únicas para el filtro
  const regions = [...new Set(countries.map(c => c.region))].sort();

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <Navbar bg="dark" variant="dark" className="mb-4 shadow sticky-top">
        <Container>
          <Navbar.Brand>🌎 Explorador de Países</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        {/* PANEL DE CONTROL: Búsqueda y Filtros */}
        <Row className="mb-4 g-3">
          <Col md={4}>
            <Form.Control
              placeholder="🔍 Buscar por nombre..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select onChange={(e) => setRegionFilter(e.target.value)}>
              <option value="">Todas las regiones</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select onChange={(e) => setSortType(e.target.value)}>
              <option value="">Ordenar por...</option>
              <option value="asc">Nombre (A - Z)</option>
              <option value="desc">Nombre (Z - A)</option>
              <option value="pop-high">Mayor Población</option>
              <option value="pop-low">Menor Población</option>
            </Form.Select>
          </Col>
        </Row>

        <Row>
          {finalDisplay.length > 0 ? (
            finalDisplay.map((c, i) => (
              <Col key={i} md={4} lg={3} className="mb-4">
                <Card className="h-100 border-0 shadow-sm card-hover">
                  <Card.Img variant="top" src={c.bandera} style={{ height: '150px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title className="h6">{c.nombre}</Card.Title>
                    <Card.Text className="small text-muted">
                      <strong>Región:</strong> {c.region}<br/>
                      <strong>Capital:</strong> {c.capital}<br/>
                      <strong>Población:</strong> {c.poblacion.toLocaleString()}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center mt-5">
              <h4>No se encontraron países con esos filtros 😕</h4>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;