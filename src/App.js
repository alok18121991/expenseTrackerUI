import './App.css';
import AddExpense from './components/Expense/addExpense'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Container className='app-container'>
          <Row>
            <Col xs lg="1" className='nav-bar'>
              <nav class="nav flex-column">
                <a class="nav-link" href="#">Active</a>
                <a class="nav-link" href="#">Link</a>
                <a class="nav-link" href="#">Link</a>
                <a class="nav-link" href="#">Disabled</a>
              </nav>
            </Col>
            <Col>
              <AddExpense></AddExpense>
            </Col>
          </Row>

        </Container>
      </div>
    </div>
  );
}

export default App; 
