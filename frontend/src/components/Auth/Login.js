import React,{ useRef, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Loginlogo  } from '../../Assests/Svg/loginLogo.svg';

import { ReactComponent as Facebook  } from '../../Assests/Svg/facebook.svg';
import { ReactComponent as Twitter  } from '../../Assests/Svg/twitter.svg';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"
import GoogleAuth from '../../GoogleAuth';
import GitHubAuth from '../../GithubAuth';

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
   
  
    async function handleSubmit(e) {
      e.preventDefault()
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/dashboard")
          
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
         
            setError(error.message)
        });
      setLoading(false)
    }
    return (
        <>
            <div className="row box">
                <div className="col-lg-7">
                    <div className="container">
                        <div className="row">
                            <div className="logo px-4 py-2">
                             <Loginlogo></Loginlogo>
                            </div>
                        </div>
                        <div className="row d-flex flex-column justify-content-center box-login">
                        <div className="row justify-content-center ">
                            <h1 className='login-head-text'>Login to Your Account</h1>
                            {error && <h6>{error}</h6>}
                        </div>
                        <div className="row justify-content-center">
                            <form onSubmit={handleSubmit} className='d-flex flex-column form'>
                                <input type="email" className='form-control' placeholder='Email' ref={emailRef}/>
                                <input type="password" className='form-control' placeholder='Password' ref={passwordRef} />
                                <div className="d-flex justify-content-center">
                                <input type="submit" className='submit-btn' value={"Sign In"}  disabled={loading}/>
                                </div>
                            </form>
                        </div>
                        <div className="row justify-content-center">
                            <div className="divider">
                                <div className="line-start"></div>
                                <span className='divider-text'> or connect with Social Accounts</span>
                                <div className="line-end"></div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="socials">
                                
                            <GoogleAuth />
                           <GitHubAuth />
                          

                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 box-red d-flex align-items-center">
                    <div className="box2  d-flex flex-column  align-items-center">
                        <h1>Welcome !</h1>
                        <h5>Sign up and start building you projects</h5>
                        <Link to={'/register'}><button className="btn register">Register</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
