import React, { useState } from 'react';
import loginFormData from "./Login.json";
import { Link, useNavigate } from 'react-router-dom';
const Login = ({ setShowNavbar }) => {
    setShowNavbar(false);
    const [data, setdata] = useState([{}]);
    const navigate  = useNavigate();
    const handlechange = (e) => {
        console.log(e.target.name, e.target.value);
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const handleclick = () => {
        let storedUsers = JSON.parse(localStorage.getItem('SIGNUPDATA')) || [];
        let user = storedUsers.find(user => user.email === data.email && user.password === data.password);

        if(user) {
            console.log('Login successful');
            localStorage.setItem('USERDATA', JSON.stringify(user));
            navigate('/Home')
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <div className="card-body">
                            {loginFormData.map((e, i) => (
                                <div key={i} className="mb-3">
                                    <label htmlFor={e.name} className="form-label">{e.label}</label>
                                    <input type={e.type} className="form-control" placeholder={e.placeholder} name={e.name} onChange={handlechange} />
                                </div>
                            ))}
                            <button className="btn btn-primary" onClick={handleclick}>Login</button>
                            <Link to='/Signup' className='m-5'>Create a new account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
