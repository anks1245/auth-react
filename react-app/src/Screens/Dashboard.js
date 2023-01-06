import {React,Component, useEffect,useState} from "react";
import { Link,Route, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import Layout from "../Components/Layout.js";
import { AuthProvider, useAuth } from "../context/AuthProvider.js";
import axios from "axios";
import environment from "../environment.js";
import { Button } from "react-bootstrap";
const Dashboard = () =>{
    const auth = useAuth();
    const navigate = useNavigate();
    const [dataArr,setDataArr]=useState([]);
    useEffect(()=>{
        console.log(localStorage.getItem("loggedIn"))
        if(localStorage.getItem("loggedIn")==null){
            navigate('/');
        }
        // console.log(auth.tokens);

        getData();

        
    },[]);

    const getData = () => {
        // let header = new Headers();
        // header.set("Authorization","Bearer "+localStorage.getItem("accessToken"));
        // console.log("Bearer "+localStorage.getItem("accessToken"));
        axios.get(environment.API_URL+"users/get-data",
            // {headers:{"Authorization":"Bearer "+localStorage.getItem("accessToken")}}
        ).then(data=>{
            console.log(data);
            if(data.errStatus == false){
                setDataArr(data.resp.data.data)
            }else{
                getData()
            }
        }).catch(err=>{
            console.log(err);
            // let user = JSON.parse(localStorage.getItem("user"))
            if(err.response.status == 401){
                getData();
            }else{
                console.log(err)
            }
        })
    }

    return(
        // <AuthProvider>
            <Layout>
                <p>Hey Welcome, </p>
                <Button onClick={(e)=>getData()}>Click Here to refresh</Button>
                {dataArr.map((data,index)=>{
                    return (
                        <div key={index+1}>
                            <center><p>{data.name}</p></center>
                        </div>
                    )
                })}
                
            </Layout>
        // </AuthProvider>
    );
}
export default Dashboard;