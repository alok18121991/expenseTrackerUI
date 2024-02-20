import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import AddExpense from './components/Expense/AddExpense/addExpense';
import ExpenseHistory from './components/Expense/History/history';
import Dashboard from './components/Dashboard/dashboard';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const user = {
  userId: '65bce7916e102aee72e6706a',
  userName: "Alok Kumar Singh"
};

const users = [
  {
      userId: '65bce7916e102aee72e6706a',
      userName: 'Alok Kumar Singh'
  },
  {
      userId: '65bd004222aa8c35198c22be',
      userName: 'Rashi Vishwakarma'
  }
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard user={user} users={users}/>,
      },
      {
        path: "add",
        element: <AddExpense />,
      },
      {
        path: "history",
        element: <ExpenseHistory user={user} users={users} limit={0}/>,
      },
      
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
