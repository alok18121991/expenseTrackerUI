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
import ErrorPage from './pages/error-page';

function App() {

  const [userData, setUserData] = useState();

  useEffect(() => {
    axios.get('http://192.168.1.7:8080/user/65bce7916e102aee72e6706a')
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
  id: '65bce7916e102aee72e6706a',
  firstName: "Alok",
  lastName: "Kumar Singh"
};

let users = [
  {
      id: '65bce7916e102aee72e6706a',
      firstName: 'Alok Kumar Singh'
  },
  // {
  //     userId: '65bd004222aa8c35198c22be',
  //     userName: 'Rashi Vishwakarma'
  // }
];

const router = userData && createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    errorElement: <ErrorPage />,
    children: [
      
      {
        path: "",
        element: <Dashboard user={user} />,
      },
      {
        path: "add",
        element: <AddExpense user={user}/>,
      },
      {
        path: "history",
        element: <ExpenseHistory user={user} users={users} title="Expense History" sortKey="expenseDate" limit={0} showDivider={true}/>,
      },
      {
        path: "stats",
        element: <Stats user={user} users={users} limit={0}/>,
      },
      {
        path: "settings",
        element: <Settings user={user} users={users} limit={0}/>,
      },
      {
        path: "group",
        element: <GroupHome user={user}  userData={userData}/>
      },
      {
        path: "group/history", 
        element: <ExpenseHistory user={user} users={users} title="Expense History" sortKey="expenseDate" limit={0}/>,
      },
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
