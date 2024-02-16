import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import FooterMenu from './components/Footer/footerMenu';

function App() {
  return (
    <div className="App">
        <Container>
          <Row className="App-header">
            <Col className='outlet'>
              <Outlet/>
            </Col>
          </Row>
          <Row className="footer-menu flex-row">
              <FooterMenu />
          </Row>
        </Container>
      </div>
  );
}

export default App; 
