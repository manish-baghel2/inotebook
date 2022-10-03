import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [credentials, setCredentials] = useState({email: "",password: ""});
    let history = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            // redirect
            localStorage.setItem('token',json.authtoken);
            // history.push("/");        
            history("/", { replace: true });
        }
        else{
            alert("invalid credentials");
        }
        setCredentials({email: "",password: ""});
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
}

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-1">
                    <label htmlFor="email">Email address</label>
                    <input onChange={onChange} type="email" className="form-control" value={credentials.email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-1">
                    <label htmlFor="password">Password</label>
                    <input onChange={onChange} type="password" value={credentials.password} name="password" className="form-control" id="password" placeholder="Password"/>
                </div>
                <div className="form-check">
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default UserLogin