
import React from 'react'
import { addProject } from '../service/ApiCalls'
import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function AddProject(props) {

    const projectDescription = useRef()
    const projectName = useRef()
   
    const deadline = useRef()
    const { currentUser } = useAuth()
    const [sucess, setSucess] = useState(false);
  

  
    const handleClose = () => props.onClose();
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        "userId": currentUser.uid,
        "projectDescription": projectDescription.current.value,
        "projectName": projectName.current.value,
        "projectDeadline": deadline.current.value,
   
      }
  
      const response = addProject(data);
      response.then((data) => {
        setSucess(true)
        window.location.reload()
      })
      response.catch((err => {
        setSucess(false)
      
      }))
    }
  return (
    <Modal show={props.showModalAddProject} >
    <Modal.Header >
      <Modal.Title>Add Project</Modal.Title>
      <Button variant="secondary" onClick={handleClose} style={{backgroundColor:"#E6858A"}}>
        x
      </Button>
    </Modal.Header>
    <Modal.Body>

      <div className="row">
        <div className="col-lg-12 d-flex justify-content-center">
          <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Project Name' className='form-control my-2' ref={projectName}  />
            <textarea name="description" id="description" cols="30" rows="10" ref={projectDescription} placeholder='Enter Details of Task' className='form-control my-2'></textarea>
            <label htmlFor="deadline" className='select-label'>Enter the deadline</label>
            <input type="date" id='deadline' className='form-control' ref={deadline} />
           
            <div className="d-flex justify-content-center">

              <input type="submit"  className=' submit-btn ' style={{ color: "white", margin: '20px auto', cursor: "pointer" }} />
             
            </div>
          </form>

        </div>
      </div>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose} style={{backgroundColor:"#E6858A"}}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>

  )
}

export default AddProject
