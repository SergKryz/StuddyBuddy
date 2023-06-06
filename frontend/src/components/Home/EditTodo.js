import React from 'react'
import { EditTodoCall, getProjects } from '../service/ApiCalls'
import { useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function EditTodo(props) {
  const taskName = useRef()
  const description = useRef()
  const projectName = useRef()
  const status = useRef()
  const deadline = useRef()
  const { currentUser } = useAuth()
  const [sucess, setSucess] = useState(false);
  const [project, setProjects] = useState([]);

  // const [show, setShow] = useState(true);

  const handleClose = () => props.onClose();
  // const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      "userId": currentUser.uid,
      "todoDescription": description.current.value,
      "projectId": projectName.current.value,
      "todoId": props.todoData.todoId,
      "deadline": deadline.current.value,
      "todoName": taskName.current.value,
      "status": status.current.value
    }

    const response = EditTodoCall(data);
    response.then((data) => {
      setSucess(true)
      window.location.reload()
    })
    response.catch((err => {
      setSucess(false)
      console.log(err)
    }))
  }
  useEffect(() => {


    const projectResponse = getProjects(currentUser?.uid);
    projectResponse.then((data) => {
      setProjects(data)
    })
    projectResponse.catch((err) => {
      console.log(err)
    })

  }, [])

  return (
    <>

      <Modal show={props.showModal} >
        <Modal.Header >
          <Modal.Title>Edit Task</Modal.Title>
          <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "#E6858A" }}>
            x
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Task Name' className='form-control my-2' ref={taskName} defaultValue={props.todoData.todoName} />
                <textarea name="description" id="description" cols="30" rows="10" ref={description} placeholder='Enter Details of Task' className='form-control my-2' defaultValue={props.todoData.todoDescription}></textarea>
                <input type="date" className='form-control' ref={deadline} defaultValue={props.todoData.deadline} />
                <label htmlFor="project" className='select-label'>Select the Project</label>
                <select id="projectSelect" className='form-control' ref={projectName} >
                  <option value="">Select</option>
                  {project.projectlist && project.projectlist.map((project) => (
                    <option key={project.projectId} value={project.projectId}  selected={project.projectId == props.todoData.projectId}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
                <label htmlFor="status" className='select-label'>Select Status of Task</label>
                <select name="status" id="status" className='form-control  my-2' ref={status} defaultValue={props.todoData.status}>
                  <option value="done">Done </option>
                  <option value="inprogress">inProgress</option>
                </select>
                <div className="d-flex justify-content-center">
                  <input type="submit" className=' submit-btn ' style={{ color: "white", margin: '20px auto', cursor: "pointer" }} />
                 
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "#E6858A" }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}

export default EditTodo
