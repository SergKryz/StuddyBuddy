import React from 'react'
import './Register.css'
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Loginlogo  } from '../../Assests/Svg/loginLogo.svg';
import { ReactComponent as Google  } from '../../Assests/Svg/google.svg';
import { ReactComponent as Facebook  } from '../../Assests/Svg/facebook.svg';
import { ReactComponent as Twitter  } from '../../Assests/Svg/twitter.svg';
import { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import GoogleAuth from '../../GoogleAuth';
import GitHubAuth from '../../GithubAuth';


function Register() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
   const navigate = useNavigate();
  
    async function handleSubmit(e) {
      e.preventDefault()

  
    
        setError("")
        setLoading(true)
    
        await signup(emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
            
            const user = userCredential.user;
        
            navigate("/")
            
        })
        .catch(err=>{
            setError(err.message)
        })
      

       
  
  
      setLoading(false)
    }

    return (

        <div className="row box">

            <div className="col-lg-5 back-color">
               <div className="row">
             
                            <div className="logo px-4 py-2">
                            <Loginlogo></Loginlogo>
                           
                        </div>
               </div>
               <div className="row">
               <div className="box-red-register d-flex align-items-center">
                    
                    <div className="box2  d-flex flex-column  align-items-center">
                        <h1>Hello learner !</h1>
                        <h5>Already have an account</h5>
                       <Link  to={'/'}> <button className="btn register">Sign in</button></Link> 
                    </div>
                </div>
               </div>
              
            </div>
            <div className="col-lg-7 ">
                <div className="container box d-flex flex-column justify-content-center">

                    <div className="row justify-content-center ">
                        <h1 className='login-head-text'>Create Account</h1>
                    </div>
                    {error && <h5>{error}</h5> }
                    <div className="row justify-content-center">
                        <form onSubmit={handleSubmit} className='d-flex flex-column form'>
                            <input type="email" className='form-control' placeholder='Email' ref={emailRef}/>
                            <input type="password" className='form-control' placeholder='Password' ref={passwordRef} />
                            <div className="d-flex justify-content-center">

                                <input type="submit" className='submit-btn' value={"Sign Up"} disabled={loading}/>
                            </div>
                        </form>
                    </div>
                    <div className="row justify-content-center">
                    <div className="row justify-content-center">
                            <div className="socials">
                                
                            <GoogleAuth />
                           <GitHubAuth />
                          

                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
    )
}

export default Register
