import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from '../../Assests/Svg/nav-logo.svg';


import './Dashboard.css'
import { useAuth } from '../../contexts/AuthContext';
function Navbar() {
    const {currentUser ,logout} = useAuth()
    const navigate = useNavigate()
    async function handleLogout() { 
        try {
          await logout()
          navigate("/")
        } catch {
        }
      }
  return (
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <Link to={'/dashboard'} class="navbar-brand"><Logo/> </Link>
     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
     </button>

     <div class="collapse navbar-collapse" id="navbarSupportedContent">
         <ul class="navbar-nav mr-auto">
             <li class="nav-item active mx-3">
                <Link  to={'/dashboard'} class="nav-link" > <span class="sr-only">(current)</span> Dashboard</Link>
                
             </li>
             <li class="nav-item active mx-3">
             <Link to={'/projects'} class="nav-link" >Projects</Link>

             </li>
             <li class="nav-item active mx-3">
             <Link to={'/tasks'} class="nav-link" >Tasks</Link>
                 
             </li>
             <li class="nav-item active mx-3">

             <Link class="nav-link"  to={'/pomodoro'}>Pomodoro Timer</Link>
             </li>
             
         </ul>
        
         <div className="profile">
             <span className='name'>{currentUser?.displayName ? currentUser.displayName:currentUser?.email}</span>
            <img src={currentUser?.photoURL ? currentUser.photoURL : 'https://img.freepik.com/premium-vector/person-avatar-design_24877-38137.jpg?w=2000'} alt="" className='profile-img' width={"40px"}  height={"40px"}/>
            <button onClick={handleLogout} className='logout-btn'> Logout </button>
         </div>
     </div>
 </nav>
  )
}

export default Navbar
