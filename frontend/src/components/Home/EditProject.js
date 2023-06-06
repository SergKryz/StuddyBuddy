
import React from 'react'
import { EditProjectCall } from '../service/ApiCalls'
import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function EditProject(props) {
  
    const projectDescription = useRef()
    const projectName = useRef()
    const projectDeadline = useRef()
    const { currentUser } = useAuth()
    const [sucess, setSucess] = useState(false);
  
    // const [show, setShow] = useState(true);
  
    const handleClose = () => props.onClose();
    // const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        "userId": currentUser.uid,
        "projectDescription": projectDescription.current.value,
        "projectName": projectName.current.value,
        "projectId": props.projectData.projectId    ,
        "projectDeadline": projectDeadline.current.value,

      }
  
      const response = EditProjectCall(data);
      response.then((data) => {
        setSucess(true)
      
        window.location.reload()
      })
      response.catch((err => {
        setSucess(false)
        console.log(err)
      }))
    }
  return (
    <Modal show={props.showModalEditProject} >
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
            <input type="text" placeholder='Enter Task Name' className='form-control my-2' ref={projectName}  defaultValue={props.projectData.projectName}/>
            <textarea name="description" id="description" cols="30" rows="10" ref={projectDescription} placeholder='Enter Details of Project' className='form-control my-2' defaultValue={props.projectData.projectDescription}></textarea>

            <input type="date" className='form-control' ref={projectDeadline} defaultValue={props.projectData.projectDeadline} />
           
       
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

export default EditProject
