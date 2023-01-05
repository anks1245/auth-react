import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import environment from './environment';

axios.interceptors.request.use((request)=>{
  console.log(request);

  request.headers.Authorization="Bearer "+localStorage.getItem("accessToken")

  return request;
})

axios.interceptors.response.use((response)=>{
  console.log(response)
  return response;
},(error)=>{
  console.log(error);
  let user = JSON.parse(localStorage.getItem("user"))
  if(error.response.status == 401){
      axios.post(environment.API_URL+"token",{
          email:localStorage.getItem(user.email),
          password:localStorage.getItem(user.password),
          isAdmin:true,
          refreshToken:localStorage.getItem("refreshToken")
      }).then(resp=>{
          localStorage.removeItem('accessToken');
          localStorage.setItem('accessToken',resp.data.token)
          return resp;
          // getData();
      }).catch(e=>{
          if(e.response.status == 401){
              localStorage.clear();
              // alert('You have been logout!!... Plz Login Again')
              // navigate('/')
              return e;
          }else{
              console.log(e.response.data);
          }
      })
  }else{
      console.log(error)
  }
  return error;
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>
  <BrowserRouter basename='/'>
    <App/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
