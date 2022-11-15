import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types'; // Register User
// import { UserContext } from '../../App';
// import { useContext } from 'react';
//const {state,dispatch} = useContext(UserContext);


export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/verification')) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}; 

export const verifyUser = (otp,history) => dispatch => {
  axios
  .post('api/users/verification',otp)
  .then(res=>history.push('/login'))
  .catch(err=>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
};

export const saveProduct = (userData,history)=>dispatch=>{
  axios
    .post('/api/users/additems',userData)
    .then(res => history.push('/dashboard'))
    .catch(err=>dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
  );
};

export const saveOptions = (userData,history)=>dispatch=>{
  axios
    .post('/api/users/hostel',userData)
    .then(res => history.push('/hostel'))
    .catch(err=>dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
  );
};


// export const loadObjects = () =>  {
//   axios
//   .get('/api/users/dashboard')
//   .then(res=>{return res.data})
//   .catch(err=>{return err})
// };

export const saveHostel = (userData,history)=>dispatch=>{
  axios
    .post('/api/users/addhostel',userData)
    .then(res=>history.push('/dashboard'))
    .catch(err=>dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
  );
};

//update profile
export const saveProfile = (userData,history)=>dispatch=>{
  axios
    .post('/api/users/updateprofile',userData)
    .then(res=>history.push('/profile'))
    .catch(err=>dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
  );
};

export const saveHostelChanges = (userData,history)=>dispatch=>{
  axios
    .post('/api/users/updatehostel',userData)
    .then(res=>history.push('/profile'))
    .catch(err=>dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
  );
};

export const saveProductChanges = (userData,history)=>dispatch=>{
  axios
    .post('/api/users/updateproduct',userData)
    .then(res=>history.push('/profile'))
    .catch(err=>dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
  );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}; // Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
}; // User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
}; // Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
