import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { getTaskByUserId, getTaskbyName, deleteTodo, EditTodoCall, getProjectNameByIdCall } from '../service/ApiCalls'
import { useAuth } from '../../contexts/AuthContext'
import EditTodo from '../Home/EditTodo'



function TodoTask({todo,index,showDetails}) {


    const [projectNameById, SetProjectNameById] = useState()
    const [date, setDate] = useState()
    const [showModal, setShowModal] = useState(false)
    const [passtodoData, setPassTodoData] = useState()
  

    useEffect(() => {
      
                if(todo.projectId==null){
                  SetProjectNameById(null)
                }
                else{
                    const response = getProjectNameByIdCall(todo.projectId);
                    response.then((data) => {
                       
                       SetProjectNameById(data.projectName)
                    })
                    response.catch(err => console.log(err))
                }

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


    const showDetailsTodoTask = (data) => {

        showDetails(data)
    }

    function handleEdit(todoData) {
        setPassTodoData(todoData)

        setShowModal(true)
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    function changeStatus(todoId, todo) {
        const updatedData = {
            "userId": todo.userId,
            "todoId": todo.todoId,
            "todoName": todo.todoName,
            "todoDescription": todo.todoDescription,
            "deadline": todo.deadline,
            "projectId": todo.projectId,
            "status": "done"
        }
        const response = EditTodoCall(updatedData);
        response.then((data) => {

            window.location.reload()
        })
        response.catch((err) => { console.log(err) })
    }
    
 
    useEffect(() => {

        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate)
    }, [])




    return (
        <>
        {showModal && <EditTodo todoData={passtodoData} onClose={handleModalClose} showModal={showModal} />}
        <tr onClick={() => {
            showDetailsTodoTask(todo.todoName)
        }} style={{ cursor: "pointer" }}>
            <td >
                <div className="row">
                    <div className="col-lg-12 d-flex align-items-center" >
                        {/* <div className="check mr-4"></div> */}
                        <input type="checkbox" className='check mr-4' disabled={todo.status == "done"} onClick={() => { changeStatus(todo.todoId, todo) }} />
                        <div className="task-table-task-text">{todo.todoName}</div>
                    </div>
                </div>
            </td>
            <td >{todo.deadline}</td>

            <td>{projectNameById}</td>
            <td >
                <div className="row">
                    <div className="col-lg-12">
                        {
                            (todo.status == "inprogress") ? ((date == todo.deadline) ? <button className='btn btn-due inprogress '>Due</button> : <button className='btn btn-due'>Inprogress</button>) : <button className='btn btn-due done'>Done</button>
                        }
                    </div>
                </div>

            </td>
            <td> <img src="./edit.svg" alt="" onClick={() => { handleEdit(todo) }} /></td>
            <td> <img src="./trash.svg" alt="" onClick={() => { handleDelete(todo.todoId) }} /></td>

        </tr>

        </>

    )
}

export default TodoTask
