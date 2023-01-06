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
},(error)=>{
  console.log(error);
  return error;
})

axios.interceptors.response.use((response)=>{
  console.log(response)
  return {errStatus:false, resp:response};
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
          console.log("1")
          console.log(resp)
          if(resp.errStatus == false){
            localStorage.removeItem('accessToken');
            localStorage.setItem('accessToken',resp.resp.data.token)
            return {errStatus:false , resp:resp};
          }else{
            return {errStatus:true, resp:resp}
          }
          
          
          // getData();
      }).catch(e=>{
          console(e);
          if(e.response.status == 401){
              console.log("2")
              console.log(e)
              localStorage.clear();
              // alert('You have been logout!!... Plz Login Again')
              // navigate('/')
              return {errStatus:true, resp:e};
          }else{
              console.log("3");
              console.log(e.response.data);
              return {errStatus:true, resp:e};
          }
      })
  }else{
      console.log("4");
      console.log(error)
      return  {errStatus:true, resp:error}
  }
  // return error;
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
