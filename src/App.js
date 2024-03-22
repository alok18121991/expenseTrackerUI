import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from './pages/MainContainer';
import Dashboard from './pages/Dashboard/dashboard';
import AddExpense from './pages/Expense/AddExpense/addExpense';
import ExpenseHistory from './pages/Expense/History/history';
import Stats from './pages/Stats/stats';
import Settings from './pages/Settings/Settings';
import { useState } from 'react';
import GroupHome from './pages/GroupHome/groupHome';
import ErrorPage from './pages/error-page';
import { ActiveGroupContext, UserContext } from './pages/Components/Context/context';
import { callGetUserDetailsApi } from './pages/API/getUserDetailsApi';
import { HttpStatusCode } from 'axios';
import AddGroup from './pages/GroupHome/AddGroup/addGroup';
import AddOwner from './pages/GroupHome/AddOwners/addOwners';
import { Button } from 'react-bootstrap';

function App() {

  const [userId, ] = useState("65bce7916e102aee72e6706a");
  // const [userName, ] = useState("shankar1812");
  const [userData, setUserData] = useState();
  const [activeGroup, setActiveGroup] = useState({id:null});

  // useEffect(() => {
  //   callGetUserDetailsApi(userId)
  //     .then(response => {
  //       if (response.status === HttpStatusCode.Ok) {
  //         setUserData(response.data);
  //       } else {
  //         console.log("error occured while fetching userDetails", response.error)
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [userId]);
  

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
      },
      {
        path: "group/add",
        element: <AddGroup />
      },
      {
        path: "group/add/owner",
        element: <AddOwner />
      }
    ]
  }
]);
  
  
const handleLogin = event => {
  callGetUserDetailsApi(userId)
      .then(response => {
        if (response.status === HttpStatusCode.Ok) {
          setUserData(response.data);
        } else {
          console.log("error occured while fetching userDetails", response.error)
        }
      })
      .catch(error => {
        console.log(error);
      });
}

  return (
    
    userData ?

    <UserContext.Provider value={[userData, setUserData]}>
      <ActiveGroupContext.Provider value={[activeGroup, setActiveGroup]}>
        <div>
          {userData && <RouterProvider router={router} />}
        </div>
    </ActiveGroupContext.Provider>
    </UserContext.Provider>

    :
    
    <div className="login">
    <Button variant="primary" onClick={(i) => handleLogin(i)} className="create-group-btn">
        Login
    </Button>
    </div>



  );
}

export default App; 
