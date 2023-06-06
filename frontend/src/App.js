import logo from './logo.svg';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Dashboard from './components/Home/Dashboard';
import Navbar from './components/Home/Navbar';
import Footer from './components/Home/Footer';
import Task from './components/Tasks/Task';
import Project from './components/Projects/Project';
import Pomodoro from './components/Pomodoro/Pomodoro';

import PrivateRoute from './PrivateRoute'
import { useAuth } from './contexts/AuthContext';
import { Fragment } from 'react';


function App() {
  const { currentUser } = useAuth()

  return (
    <>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              element={
                <>
                  <Navbar />
                  <Outlet />
                  <Footer />
                </>
              }
            >
              <Route exact path='/dashboard' element={<PrivateRoute />}>
                <Route exact path='/dashboard' element={<Dashboard />} />
              </Route>
              <Route exact path='/tasks' element={<PrivateRoute />}>
                <Route exact path='/tasks' element={<Task />} />
              </Route>
              <Route exact path='/projects' element={<PrivateRoute />}>
                <Route exact path='/projects' element={<Project />} />
              </Route>
              <Route exact path='/pomodoro' element={<PrivateRoute />}>
                <Route exact path='/pomodoro' element={<Pomodoro />} />
              </Route>
            </Route>
          </Routes>
        </Fragment>
      </BrowserRouter>

    </>

  );
}

export default App;
