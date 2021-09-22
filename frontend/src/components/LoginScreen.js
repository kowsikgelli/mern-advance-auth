import { useState ,useEffect} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./LoginScreen.css";

const LoginScreen =({history})=>{
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            history.push("/");
        }
    },[history])

    const loginHandler =async(e)=>{
        e.preventDefault();

        const config = {
            header:{
                "Content-Type":"application/json"
            }
        }

        try{
            console.log("before try")
            const {data} = await axios.post("/login",{email,password},config)
            console.log(`data variable ${data}`)
            localStorage.setItem("authToken",data.token)
            history.push("/")
        }catch(err){
            setError(err.response.data.error);
            setTimeout(()=>{
                setError("");
            },5000)
        }
    }
    return(
        <div className="login-screen">
            <form onSubmit={loginHandler} className="login-screen_form">
                <h3 className="login-screen_title">Login</h3>
                {error && <span className="error-message">{error}</span>}

                <div className="form-group">
                    <label htmlFor="email">Email: </label>
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
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        required
                        id="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                

                <button type="submit" className="btn btn-primary">login</button>
                <span className="login-screen_subtext">do not Have an account? <Link to="/register">Register</Link></span>
            </form>

        </div>
    )
}

export default LoginScreen;