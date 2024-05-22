import React, { useState } from 'react';
import signupFormData from "./Signup.json";
import { Link } from 'react-router-dom';
const Signup = ({ setShowNavbar }) => {
    setShowNavbar(false);
    const [data, setdata] = useState({});
    // const [signupdata, setsignupdata] = useState([]);

    const handlechange = (e) => {
        console.log(e.target.name, e.target.value);
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const handleclick = () => {
        let ccc = JSON.parse(localStorage.getItem('SIGNUPDATA')) || [];
        let emailexists = ccc.find(user => user.email === data.email);

        if (!emailexists) {
            let ddd = ccc.concat(data);
            localStorage.setItem('SIGNUPDATA', JSON.stringify(ddd));
            // setsignupdata(ddd);
            // console.log(ddd);
        } else {
            alert('Email already exists');
        }
    };

    // useEffect(() => {
    //     let aaa = JSON.parse(localStorage.getItem('SIGNUPDATA')) || [];
    //     setsignupdata(aaa);
    // }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <form className="p-4 rounded shadow">
                        {signupFormData.map((e, i) => (
                            <div key={i} className="mb-3">
                                <label htmlFor={e.name} className="form-label">{e.label}</label>
                                <input type={e.type} className="form-control" id={e.name} placeholder={e.placeholder} name={e.name} onChange={handlechange} />
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary" onClick={handleclick}>Submit</button>
                        <Link to='/' className='m-5'>already have a account</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
