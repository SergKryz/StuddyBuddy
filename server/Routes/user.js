const express = require('express');
const router = express.Router();
const todoController=require('../Controllers/todoController')
const projectController=require('../Controllers/projectController')



const cors = require('cors');
router.use(cors({
    origin:"*"
  }))

  // Todo Routes
  router.get('/get-task-by-userId/:userId',todoController.getTodoByUserId)
  router.get('/todos/:userId',todoController.getTodayTodoByUserId)
  router.get('/get-task-by-projectid/:projectId',todoController.getTaskByProjectId)
  router.get('/get-task-by-todoName/:userId/:todoName',todoController.getTaskByName)
  router.post('/add-todo',todoController.addTodo)
  router.delete('/delete-todo/:todoId',todoController.deleteTodoByTodoId)
  router.put('/edit-todo',todoController.editTodo)

  // project Routes
  router.post('/add-project',projectController.addProject)
  router.delete('/delete-project/:projectId/:projectName',projectController.deleteProject)
  router.get('/projects/:userId',projectController.getProjectByUserId)
  router.get('/get-project-by-projectid/:projectId',projectController.getProjectByProjectId)
  router.get('/get-project-by-projectid-call/:projectId',projectController.getProjectByIdCall)
  router.put('/edit-project',projectController.editProject)

  module.exports=router;