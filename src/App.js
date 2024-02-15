import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import FooterMenu from './components/Footer/footerMenu';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Container>
          <Row>
            <Col className='outlet'>
              <Outlet/>
            </Col>
          </Row>
          <Row className="footer-menu flex-row">
              <FooterMenu />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App; 
