import { useState,useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./RegisterScreen.css";

const RegisterScreen =({history})=>{
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            history.push("/");
        }
    },[history])

    const registerHandler =async(e)=>{
        e.preventDefault();
        console.log("hello register")

        const config = {
            header:{
                "Content-Type":"application/json"
            }
        }
        if(password !== confirmPassword){
            setPassword("")
            setConfirmPassword("")
            setTimeout(()=>{
                setError("")
            },5000);
            return setError("password do not match")
        }

        try{
           // const response = await fetch("/register",{method:'POST',headers:{'Content-Type':'applicatoion/json'},body:JSON.Stringify({username,email,password})
            
            const {data} = await axios.post("/register",{username,email,password},config)
            localStorage.setItem("authToken",data.token)
            console.log(`token is :${data.token}`)
            history.push("/")
        }catch(err){
            console.log("catched")
            setError(err.response.data.error);
            setTimeout(()=>{
                setError("");
            },5000)
        }
    }
    return(
        <div className="register-screen">
            <form onSubmit={registerHandler} className="register-screen_form">
                <h3 className="register-screen_title">Register</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="name">Username: </label>
                    <input 
                        type="text"
                        required
                        id="name"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">email: </label>
                    <input 
                        type="email"
                        required
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">password: </label>
                    <input 
                        type="password"
                        required
                        id="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmpassword">confirm password: </label>
                    <input 
                        type="password"
                        required
                        id="confirmpassword"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
                <span className="register-screen_subtext">Already Have an account? <Link to="/login">Login</Link></span>
            </form>

        </div>
    )
}

export default RegisterScreen;