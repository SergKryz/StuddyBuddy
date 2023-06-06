import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState } from 'react'
import { deleteTodo, getTodayTodos, getProjects, getTaskByProjectId, deleteProject } from '../service/ApiCalls'
import AddTodo from './AddTodo'
import { Link, useNavigate } from 'react-router-dom'
import EditTodo from './EditTodo'
import AddProject from './AddProject'
import EditProject from './EditProject'
const hashmap = {};

function Dashboard() {
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const [todo, setTodo] = useState([])
    const [project, setProjects] = useState([])
    const [projectData, setProjectData] = useState([])
    const [hashmap, setHashmap] = useState({});
        const [todoData, setTodoData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showModalAddProject, setShowModalAddProject] = useState(false)
    const [showModalEditProject, setShowModalEditProject] = useState(false)
   

    useEffect(() => {
        const response = getTodayTodos(currentUser?.uid);
        response.then((data) => {
            setTodo(data)
      
        })
        response.catch((err) => {
            console.log(err)
        })

        const projectResponse = getProjects(currentUser?.uid);
        projectResponse.then((data) => {
          setProjects(data);
          
          data.projectlist.forEach((projectData, index) => {
            const response = getTaskByProjectId(projectData.projectId);
            response.then((todoData) => {
               
              const totalTask = todoData.todoList.length;
              const doneTask = todoData.todoList.filter(todo => todo.status == "done").length;
              const percentage = totalTask !== 0 ? (doneTask / totalTask) : 0;
        
              hashmap[projectData.projectName] = percentage;
        
              if (index === data.projectlist.length - 1) {
                // Once all percentages are calculated, proceed with rendering the table
                setHashmap(hashmap);
              }
            }).catch((err) => {
              console.log(err);
            });
          });
        }).catch((err) => {
          console.log(err);
        });
    }, [])



    function handleDelete(todoId) {
        const response = deleteTodo(todoId);
        response.then((data) => {
            window.location.reload()
        })
        response.catch((err) => {
            console.log(err)
        })
    }

    function handleEdit(todoData) {
        setTodoData(todoData)
        setShowModal(true)
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handleAddProject = () => {
        setShowModalAddProject(true)
      
    }
    const handleEditProject = (projectData) => {
        setProjectData(projectData)
        setShowModalEditProject(true)
        console.log(showModalAddProject)
    }
    const handleModalCloseAddProject = () => {
        setShowModalAddProject(false)
    }
    const handleModalCloseEditProject = () => {
        setShowModalEditProject(false)
    }
    const handleDeleteProject = (projectId, projectName) => {
        const response = deleteProject(projectId, projectName);
        response.then((data) => {
          
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        })

    }



    return (
        <>

            <div className="container-fluid  " style={{ marginBottom: '106px' }} >
                <AddTodo />
                {showModal && <EditTodo todoData={todoData} onClose={handleModalClose} showModal={showModal} />}
                {showModalAddProject && <AddProject onClose={handleModalCloseAddProject} showModalAddProject={showModalAddProject} />}
                {showModalEditProject && <EditProject projectData={projectData} onClose={handleModalCloseEditProject} showModalEditProject={showModalEditProject} />}
                <div className="row">

                    <div className="col-lg-4 d-flex box7 jusify-content-center align-items-center">
                        <div className="todobox d-flex task-todobox">
                            <div className="row justify-content-center">
                                <div className='todo-text-head' >Today's Task</div>

                            </div>
                            <div className="row">
                                <div className="col-lg-12 d-flex flex-column">

                                    {
                                        todo.todos && todo.todos.length > 0 ? (todo.todos.map((todoData) => (
                                            <div className="task d-flex">
                                                <span className='task-text'>{todoData.todoName}</span>
                                                <span className='icons'>
                                                    <img src="./edit.svg" alt="" onClick={() => { handleEdit(todoData) }} />
                                                    <img src="./trash.svg" alt="" onClick={() => { handleDelete(todoData.todoId) }} />
                                                </span>
                                            </div>
                                        ))) : (
                                            <div className="task d-flex">
                                                <span className='task-text'>No Tasks Today !</span>
                                            </div>)
                                    }

                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <div className='todo-text-head' > <button className="btn btn1 d-flex justify-content-center align-items-center" data-toggle="modal" data-target="#exampleModalCenter"> <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.375 11.25C3.375 7.47876 3.375 5.59315 4.54657 4.42157C5.71815 3.25 7.60376 3.25 11.375 3.25H15.625C19.3962 3.25 21.2819 3.25 22.4534 4.42157C23.625 5.59315 23.625 7.47876 23.625 11.25V14.75C23.625 18.5212 23.625 20.4069 22.4534 21.5784C21.2819 22.75 19.3962 22.75 15.625 22.75H11.375C7.60376 22.75 5.71815 22.75 4.54657 21.5784C3.375 20.4069 3.375 18.5212 3.375 14.75V11.25Z" stroke="white" stroke-width="2" />
                                    <path d="M13.5 8.66663L13.5 17.3333" stroke="white" stroke-width="2" stroke-linecap="square" stroke-linejoin="round" />
                                    <path d="M18 13L9 13" stroke="white" stroke-width="2" stroke-linecap="square" stroke-linejoin="round" />
                                </svg>

                                    Add new Task</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 right-box-dashboard ">
                        <div className="row">
                            <div className="col-lg-12 p-5">
                                <span className='text-left project-head  '>Project Progress</span>
                                <img src="./add-timer.svg" alt="" className='mx-4' onClick={handleAddProject} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12" style={{ height: "500px", overflow: "scroll" }}>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Project Name</th>
                                            <th scope="col">Progress</th>
                                            <th scope="col">Due Date</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        { 
                                            project.projectlist && project.projectlist.length > 0 ?  project.projectlist.map((projectData, index) => (

                                                <tr>
                                                    <td >{projectData.projectName}</td>
                                                

                                                    <td >
                                                        <div className="row">
                                                            <div className="col-lg-12" >
                                                            {(hashmap[projectData.projectName] * 100).toFixed(2) }%
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-12 back-box p-0">
                                                                {/* <div className="percentage-box  " style={{ width: projectPercentage[index] * 100 + "%" }} > */}
                                                                <div className="percentage-box" style={{ width: `${hashmap[projectData.projectName] * 100}%` }}></div>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='up-text'>{projectData.projectDeadline}</td>
                                                    <td className=''><img src="./edit.svg" alt="" onClick={() => { handleEditProject(projectData) }} />
                                                    </td>
                                                    <td className=''><img src="./trash.svg" alt="" onClick={() => { handleDeleteProject(projectData.projectId, projectData.projectName) }} />
                                                    </td>
                                                </tr>
                                            )):  <tr>
                                            <td colSpan={5}  style={{textAlign:"center",fontSize:"30px"}}>Project Not Found !</td>
                                           
                                        </tr>
                                        }
                                        {/* 
                                        <tr>
                                            <td >Data Science</td>
                                            <td >
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        25%
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12 back-box">
                                                        <div className="percentage-box  ">
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='up-text'>15/05,2023</td>
                                            <td className=''><img src="./edit.svg" alt="" />
                                            </td>
                                        </tr> */}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard
