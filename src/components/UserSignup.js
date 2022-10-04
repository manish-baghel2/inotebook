import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserSignup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "",cpassword:"" });
    let history = useNavigate();
    const {name, email, password } = credentials;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // redirect
            localStorage.setItem('token', json.authtoken);
            // history.push("/");        
            history("/", { replace: true });
            props.showAlert("Account created successfully","success");
        }
        else {
            props.showAlert("invalid credentials","danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                     <label htmlFor="name">Name</label>
                    <input type="text" className="form-control my-1" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input name="email" type="text" className="form-control my-1" id="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" className="form-control my-1" id="password" placeholder="Password" minLength={5} required onChange={onChange}/>

                    <label htmlFor="cpassword">Confirm Password</label>
                    <input name="cpassword" type="password" className="form-control my-1" id="cpassword" placeholder="Confirm Password" onChange={onChange} minLength = {5} required/>
                </div>
                <button type="submit" className="btn btn-primary my-1">Submit</button>
            </form>
        </div>
    )
}

export default UserSignup