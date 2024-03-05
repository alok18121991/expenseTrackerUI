import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from './pages/MainContainer';
import Dashboard from './pages/Dashboard/dashboard';
import AddExpense from './pages/Expense/AddExpense/addExpense';
import ExpenseHistory from './pages/Expense/History/history';
import Stats from './pages/Stats/stats';
import Settings from './pages/Settings/Settings';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GroupHome from './pages/GroupHome/groupHome';

function App() {

  const [userData, setUserData] = useState();

  useEffect(() => {
    axios.get('http://192.168.1.4:8080/user/65bce7916e102aee72e6706a')
      .then(response => {
        console.log("resss....", response)
        setUserData(response.data.data.data);
      })
      .catch(error => {
        console.log("errrr....", error)
        console.log(error);
      });
  }, []);



   let user = {
  userId: '65bce7916e102aee72e6706a',
  userName: "Alok Kumar Singh"
};

let users = [
  {
      userId: '65bce7916e102aee72e6706a',
      userName: 'Alok Kumar Singh'
  },
  {
      userId: '65bd004222aa8c35198c22be',
      userName: 'Rashi Vishwakarma'
  }
];

const router = userData && createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      {
        path: "group",
        element: <GroupHome user={user} users={users} userData={userData}/>,
      },
      {
        path: "",
        element: <Dashboard user={user} users={users} userData={userData}/>,
      },
      {
        path: "add",
        element: <AddExpense />,
      },
      {
        path: "history",
        element: <ExpenseHistory user={user} users={users} title="Expense History" sortKey="expenseDate" limit={0}/>,
      },
      {
        path: "stats",
        element: <Stats user={user} users={users} limit={0}/>,
      },
      {
        path: "settings",
        element: <Settings user={user} users={users} limit={0}/>,
      }
    ]
  }
]);
  
  

  return (
    <div className="App">
       {userData && <RouterProvider router={router} />}
    </div>
  );
}

export default App; 
