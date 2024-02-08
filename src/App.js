import './App.css';
import AddExpense from './components/Expense/addExpense'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AddExpense></AddExpense>
      </header>
    </div>
  );
}

export default App; 
