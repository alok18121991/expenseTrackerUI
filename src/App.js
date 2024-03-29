import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from './Pages/MainContainer';
import Dashboard from './Pages/Dashboard/dashboard';
import AddExpense from './Pages/Expense/AddExpense/addExpense';
import ExpenseHistory from './Pages/Expense/History/history';
import Stats from './Pages/Stats/stats';
import Settings from './Pages/Settings/Settings';
import { useEffect, useState } from 'react';
import GroupHome from './Pages/GroupHome/groupHome';
import ErrorPage from './Pages/error-page';
import { ActiveGroupContext, UserContext } from './Components/Context/context';
import { callGetUserDetailsApi } from './API/getUserDetailsApi';
import axios, { HttpStatusCode } from 'axios';
import AddGroup from './Pages/GroupHome/AddGroup/addGroup';
import AddOwner from './Pages/GroupHome/AddOwners/addOwners';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { callGetUserDetailByEmailApi } from './API/getUserDetailByEmailApi';
import { callRefreshAccessTokenApi } from './API/refreshAccessTokenApi';


function App() {

  const [userData, setUserData] = useState();
  const [accessToken, setAccessToken] = useState(null);
  const [activeGroup, setActiveGroup] = useState({ id: null });

  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

  useEffect(() => {
    const refreshToken = getCookie('refresh_token');
    // console.log("Existing refresh token:");
    if (refreshToken) {
      // console.log("Found existing refresh token:");
      const decodedToken = jwtDecode(refreshToken);
      if (decodedToken && decodedToken.exp && decodedToken.exp > Date.now() / 1000) {
        // console.log("Refresh token is not expired. Initiating token refresh...");

        // Call your function to refresh the access token here
        refreshAccessToken(refreshToken)

        // Set up a timer to refresh the access token periodically
        const refreshInterval = setInterval(() => {
          refreshAccessToken(refreshToken)}, 5 * 60 * 1000); // Refresh token every 29 minute

        // Clean up the interval when component unmounts
        return () => clearInterval(refreshInterval);
      } else {
        console.log("Refresh token is expired");
      }
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      if (decodedToken && decodedToken.exp && decodedToken.exp > Date.now() / 1000) {
        if (!userData) {
          callGetUserDetailByEmailApi(decodedToken.user)
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
      }
    }
  }, [accessToken, userData])

  const getCookie = (name) => {
    const cookies = new Cookies();
    return cookies.get(name);
  };

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
          element: <ExpenseHistory title="Expense History" sortKey="expenseDate" limit={0} showDivider={true} />,
        },
        {
          path: "stats",
          element: <Stats limit={0} />,
        },
        {
          path: "settings",
          element: <Settings limit={0} />,
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

  const refreshAccessToken = async(refreshToken) => {
   
    callRefreshAccessTokenApi(refreshToken)
    .then(response => {
      if (response.status === HttpStatusCode.Ok) {
        const { accessToken } = response.data;
        setAccessToken(accessToken);
        // console.log("Access token refreshed successfully");
      }
      else{
        console.error('Token refresh failed:', response.error);
      }
    })
    .catch(error =>{
      console.error('Error refreshing token:', error);
    })

  };

  const login = useGoogleLogin({
    onSuccess: codeResponse => handleLogin(codeResponse),
    flow: 'auth-code'
  });

  const handleLogin = codeResponse => {
    callGetUserDetailsApi(codeResponse)
      .then(response => {
        if (response.status === HttpStatusCode.Ok) {
          const { accessToken, refreshToken, userData } = response.data;
          setCookie('refresh_token', refreshToken, 3*24);
          setAccessToken(accessToken) // Store JWT token in state
          setUserData(userData);

        } else {
          console.log("error occured while fetching userDetails", response.error)
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const setCookie = (name, value, hours) => {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // Convert minutes to milliseconds
    const cookies = new Cookies();
    cookies.set(name, value, { path: '/', expires: date, secure: true });
  };



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
        <GoogleLogin
          onSuccess={() => login()}

          onError={() => {
            console.log('Login Failed');
          }}

        />
        {/* <Button variant="primary" onClick={(i) => handleLogin(i)} className="create-group-btn">
          Login
        </Button> */}
      </div>

  );
}

export default App; 
