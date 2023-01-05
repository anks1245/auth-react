import { useState,useContext, useEffect } from "react";
import AuthContext, { useAuth } from "../context/AuthProvider";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import  axios  from "axios";
import environment from "../environment.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // const {setAuth} = useContext(AuthContext);
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(localStorage.getItem("loggedIn"));
        if(localStorage.getItem("loggedIn")){
            navigate('/dashboard');
        }
    },[]);

    const submit = async(e) =>{
        e.preventDefault();
        // console.log(environment.API_URL);
        let headers = new Headers();
        headers.set("Content-Type","application/json");
        await axios.post(environment.API_URL+"users/login",{email:email,password:password,isAdmin:true},{headers:headers}).then(response=>{
            console.log(response);
            if(response.data.status){
                let accessToken = response.data.token;
                let refreshToken = response.data.refreshToken;
                localStorage.setItem("loggedIn",true);
                localStorage.setItem("accessToken",accessToken);
                localStorage.setItem("refreshToken",refreshToken);
                localStorage.setItem("user",JSON.stringify(response.data.data));
                auth.login({access:accessToken,refresh:refreshToken});
                
                navigate("/dashboard");
                // console.log(auth.tokens);
                // setTokens()
            }else{
                console.log("Invalid Email and Password")
            }
        })
    }
    return (
        <Container>
            <center><h2>Login</h2></center>
            <Form onSubmit={submit}>
                <Form.FloatingLabel
                    controlId="floatingInputEmail"
                    label="Email address"
                    className="mb-3"
                >
                    <input type="email" name="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} placeholder="john@xyz.com"></input>
                </Form.FloatingLabel>
                <Form.FloatingLabel
                    controlId="floatingInputPassword"
                    label="Password"
                    className="mb-3"
                >
                    <input type="password" name="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} placeholder="******"></input>
                </Form.FloatingLabel>
                <div className="d-grid gap-2">
                    <Button type="submit" size="lg">Login</Button>
                </div>
            </Form>
        </Container>
    );
}

export default Login