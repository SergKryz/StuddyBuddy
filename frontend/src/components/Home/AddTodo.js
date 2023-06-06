import React from 'react'
import { addTodo } from '../service/ApiCalls'
import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getProjects } from '../service/ApiCalls'
import { useEffect, useState } from 'react'
function AddTodo() {

    const taskName = useRef()
    const description = useRef()
    const projectId = useRef()
    const status = useRef()
    const deadline = useRef()
    const {currentUser} = useAuth()
    const [project, setProjects] = useState([])

    useEffect(() => {
  

      const projectResponse = getProjects(currentUser?.uid);
      projectResponse.then((data) => {
          setProjects(data)
         
      })
      projectResponse.catch((err) => {
          console.log(err)
      })

  }, [])

 const  handleSubmit=(e)=>{
        e.preventDefault();
        const data={
          "userId":currentUser.uid,
          "deadline":deadline.current.value,
          "todoName":taskName.current.value,
          "todoDescription":description.current.value,
          "projectId":projectId.current.value,
          "status":status.current.value  
     }

       const response =  addTodo(data);
       response.then((data)=>{
        window.location.reload()
       })
       .catch((err=>{
        console.log(err)
       }))
    }


  return (
<>


    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title ml-auto addtask-text" id="exampleModalLongTitle">Add Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
                    <form action="">
                        <input type="text" placeholder='Enter Task Name'  className='form-control my-2' ref={taskName} />
                        <textarea name="description" id="description" cols="30" rows="10" ref={description} placeholder='Enter Details of Task' className='form-control my-2'></textarea>
                        <input type="date" className='form-control' ref={deadline}  />
                        <label htmlFor="projectSelect" className='select-label' >Select a project:</label>
                      <select id="projectSelect" className='form-control' ref={projectId} >
                        <option value="">Select</option> 
                        {project.projectlist && project.projectlist.map((project) => (
                          <option key={project.projectId} value={project.projectId}>
                            {project.projectName}
                          </option>
                        ))}
                      </select>
                        <label htmlFor="status" className='select-label'>Select Status of Task</label>
                        <select name="status" id="status" className='form-control  my-2' ref={status}>
                            <option value="done">Done</option>
                            <option value="inprogress">inProgress</option>
                        </select>
                        <div className="d-flex justify-content-center">

                        <input type="submit" onClick={handleSubmit} className=' submit-btn ' style={{color:"white",margin:'20px auto',cursor:"pointer"}}  />
                        </div>
                    </form>

                </div>
            </div>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
</>
  )
}

export default AddTodo
