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
import { ActiveGroupContext, UserContext } from './pages/Components/Context/context';

function App() {

  const [userName, ] = useState("shankar1812")
  const [userData, setUserData] = useState();
  const [activeGroup, setActiveGroup] = useState();

  useEffect(() => {
    axios.get('http://192.168.1.8:8080/user/65bce7916e102aee72e6706a')
      .then(response => {
        console.log("resss....", response)
        setUserData(response.data.data.data);
      })
      .catch(error => {
        console.log("errrr....", error)
        console.log(error);
      });
  }, [userName]);

const router = userData && createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    errorElement: <ErrorPage />,
    children: [
      
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "add",
        element: <AddExpense />,
      },
      {
        path: "history",
        element: <ExpenseHistory title="Expense History" sortKey="expenseDate" limit={0} showDivider={true}/>,
      },
      {
        path: "stats",
        element: <Stats limit={0}/>,
      },
      {
        path: "settings",
        element: <Settings limit={0}/>,
      },
      {
        path: "group",
        element: <GroupHome />
      }
    ]
  }
]);
  
  

  return (
    <UserContext.Provider value={userData}>
      <ActiveGroupContext.Provider value={[activeGroup, setActiveGroup]}>
        <div className="App">
          {userData && <RouterProvider router={router} />}
        </div>
    </ActiveGroupContext.Provider>
    </UserContext.Provider>
  );
}

export default App; 
