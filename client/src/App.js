import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import About from './Components/AboutUs/About';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Profile from './Components/Profile/profile';
import adminProfile from './Components/admin/adminprofile';
import updateProfile from './Components/updateProfile/updateProfile';
import AddProduct from './Components/AddProduct/addProduct';
import Hostel from './Components/Hostel/hostel';
import AddHostel from './Components/AddHostel/addHostel';
import Cart from './Components/Cart/cart';
import CheckedOut from './Components/CheckedOut/checkedOut';
import Product from './Components/Product/Product';
import viewHostel from './Components/viewHostel/viewHostel';
import viewProduct from './Components/viewProduct/viewProduct';
import Emailsent from './Components/Pages/Emailsent';
import NotFound from './Components/NotFound/NotFound';
import { Provider } from 'react-redux';
import store from './redux/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import PrivateRoute from './Components/private-route/PrivateRoute';
import Dashboard from './Components/Dashboard/Dashboard';

//private routes are used to protect pages from aunthorized users
// export const UserContext = createContext();
// const Routing = () => {
//   return (
//     <Provider store={store}>
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/register" component={Register} />
//         <Route exact path="/verification" component={Emailsent}/>
//         <Route path="/login" component={Login} />
//         <Switch>
//           <PrivateRoute exact path="/dashboard" component={Dashboard} />  
//           <PrivateRoute exact path="/additems" component={AddProduct}/>
//           <PrivateRoute exact path="/addhostel" component={AddHostel}/>
//           {/* <PrivateRoute exact path="/payment" component={Payment}/> */}
//           <Route path="*" component={NotFound} />
//         </Switch>
//         <Route path="*" component={NotFound} />
//       </Switch>
//       </Router>
//     </Provider>
//   )
// }
// function App () {

//   // Check for token to keep user logged in
//   if (localStorage.jwtToken) {
//     // Set auth token header auth
//     const token = localStorage.jwtToken;
//     setAuthToken(token);
//     // Decode token and get user info and exp
//     const decoded = jwt_decode(token);
//     // Set user and isAuthenticated
//     store.dispatch(setCurrentUser(decoded)); // Check for expired token
//     const currentTime = Date.now() / 1000; // to get in milliseconds
//     if (decoded.exp < currentTime) {
//       // Logout user
//       store.dispatch(logoutUser()); // Redirect to login
//       window.location.href = './login';
//     }
//   }

  
// const [state,dispatch] = useReducer(reducer,initialState)
//   return (
//    // <Provider store={store}>
//    <>
//      <UserContext.Provider value={{state,dispatch}}>
//         <Navbar/>
//         <Routing/>
//      </UserContext.Provider>  
//      </>
//   //</Provider>
    
//   );
// }

// export default App;
const token = localStorage.jwtToken;
function App() {
  // Check for token to keep user logged in
       if (localStorage.jwtToken) {
  //   // Set auth token header auth
       setAuthToken(token);
  //   // Decode token and get user info and exp
         const decoded = jwt_decode(token);
  //   // Set user and isAuthenticated
         store.dispatch(setCurrentUser(decoded)); // Check for expired token
       const currentTime = Date.now() / 1000; // to get in milliseconds
       if (decoded.exp < currentTime) {
  //     // Logout user
        store.dispatch(logoutUser()); // Redirect to login
         window.location.href = './login';
     }
   }

   if(token===undefined||token===null){
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
            <Switch>
            <Route exact path="/" component={Login} />
           <Route path="/register" component={Register} />
           <Route exact path="/verification" component={Emailsent}/>
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/additems" component={AddProduct}/>
              <PrivateRoute exact path="/addhostel" component={AddHostel}/>
              <PrivateRoute exact path="/hostel" component={Hostel}/>
              <PrivateRoute exact path="/cart" component={Cart}/>
              <PrivateRoute exact path="/product" component={Product}/>
              <PrivateRoute exact path="/profile" component={Profile}/>
              <PrivateRoute exact path="/updateprofile" component={updateProfile}/>
              <PrivateRoute exact path="/checkedOut" component={CheckedOut}/>
              <PrivateRoute exact path="/hostel/:id" component={viewHostel}/>
              <PrivateRoute exact path="/product/:id" component={viewProduct}/>
              <Route path="*" component={NotFound} />
            </Switch>
            <Route path="*" component={NotFound} />
          </Switch>
           <Footer /> 
        </Router>
      </Provider>
    );
   }
   else{
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <AdminRoute exact path="/admin" component={adminProfile}/>
            <Switch>
            <Route exact path="/" component={Login} />
           <Route path="/register" component={Register} />
           <Route exact path="/verification" component={Emailsent}/>
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/additems" component={AddProduct}/>
              <PrivateRoute exact path="/addhostel" component={AddHostel}/>
              <PrivateRoute exact path="/hostel" component={Hostel}/>
              <PrivateRoute exact path="/cart" component={Cart}/>
              <PrivateRoute exact path="/product" component={Product}/>
              <PrivateRoute exact path="/profile" component={Profile}/>
              <PrivateRoute exact path="/updateprofile" component={updateProfile}/>
              <PrivateRoute exact path="/checkedOut" component={CheckedOut}/>
              <PrivateRoute exact path="/hostel/:id" component={viewHostel}/>
              <PrivateRoute exact path="/product/:id" component={viewProduct}/>
              <Route path="*" component={NotFound} />
            </Switch>
            <Route path="*" component={NotFound} />
          </Switch>
          <Route path="*" component={NotFound} />
          </Switch>
           <Footer /> 
        </Router>
      </Provider>
    );
   }
 }

export default App;