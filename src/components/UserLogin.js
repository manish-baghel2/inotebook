import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // redirect
            localStorage.setItem('token', json.authtoken);
            // history.push("/");        
            props.showAlert("Login Successfully", "success");
            history("/", { replace: true });
        }
        else {
            props.showAlert("invalid credentials", "danger");
        }
        setCredentials({ email: "", password: "" });
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-2'>
            <h2>Login to Continue to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="email" className='mx-1'>Email address</label>
                    <input onChange={onChange} type="email" className="form-control" value={credentials.email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted mx-1">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password" className='mx-1'>Password</label>
                    <input onChange={onChange} type="password" value={credentials.password} name="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
                <div className=" my-2">
                    <small id="emailHelp" className="form-text text-muted mx-1">Don't have an account yet ? </small>
                    <Link to="/signup">signup</Link>
                </div>
            </form>
        </div>
    )
}

export default UserLogin