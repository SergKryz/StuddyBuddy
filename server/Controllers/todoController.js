const db = require('../firebase')


exports.getTodoByUserId=async(req,res)=>{
    try {
      
        const userId = req.params.userId; // Get the userId from the query parameters
        
       
     
        let query = db.collection('todos').where('userId','==',userId);
        
        const snapshot = await query.get();
      
        const todoList = [];
    
        snapshot.forEach((doc) => {
          todoList.push({ id: doc.id, ...doc.data() });
        });
    
        res.json({"todoList":todoList}   );
      } catch (error) {
        console.error('Error fetching all todoList:', error);
        res.status(500).json({ error: 'Failed to fetch  all todoList' });
      }
}

exports.addTodo=async(req,res)=>{
    try {
  
      
        var { userId, todoName,deadline, todoDescription, projectId, status } = req.body;
        if(projectId==""){
          projectId=null
        }
        // const deadline = new Date();
        const todoDocRef = db.collection('todos').doc();
        const todoId = todoDocRef.id;
        // Create a new todo object
        const todo = {
          userId,
          todoId,
          todoName,
          todoDescription,
          deadline,
          projectId,
          status
        };
    
        // Store the todo in the "todos" collection
      
        await todoDocRef.set(todo)
    
        res.status(201).json({ message: 'Todo created successfully', id: todoDocRef.id });
      } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Failed to create todo' });
      }
} 

exports.deleteTodoByTodoId=async(req,res)=>{
    try {
        const todoId = req.params.todoId; // Get the todoId from the URL parameter
      
        // Check if the todo exists
        const todoDocRef = db.collection('todos').doc(todoId);
        const todoDoc = await todoDocRef.get();
        if (!todoDoc.exists) {
          return res.status(404).json({ error: 'Todo not found' });
        }
    
        // Delete the todo
        await todoDocRef.delete();
    
        res.json({ message: 'Todo deleted successfully' });
      } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Failed to delete todo' });
      }
}

exports.getTodayTodoByUserId= async (req,res)=>{
    try {
        const userId = req.params.userId; // Get the userId from the query parameters
      
    
        const today = new Date();
        const adjustedDateString = today.toISOString().split('T')[0]; 
      
        let query = db.collection('todos').where('deadline', '==', adjustedDateString).where('userId', '==', userId);

        const snapshot = await query.get();
        const todos = [];
    
        snapshot.forEach((doc) => {
          todos.push({ id: doc.id, ...doc.data() });
        });
    
        res.json({ todos });
      } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Failed to fetch todos' });
      }
}

exports.getTaskByProjectId= async (req,res)=>{
    try {
        const projectId = req.params.projectId; // Get the userId from the query parameters
   
     
        let query = db.collection('todos').where('projectId', '==', projectId);
        
        const snapshot = await query.get();
       
        const todoList = [];
    
        snapshot.forEach((doc) => {
          todoList.push({ id: doc.id, ...doc.data() });
        });
    
        res.json({"todoList":todoList}   );
      } catch (error) {
        console.error('Error fetching todoList:', error);
        res.status(500).json({ error: 'Failed to fetch todoList' });
      }
}

exports.getTaskByName= async (req,res)=>{
    try {
        const todoName = req.params.todoName; // Get the userId from the query parameters
        const userId = req.params.userId; // Get the userId from the query parameters
    
     
        let query = db.collection('todos').where('todoName', '==', todoName).where('userId','==',userId);
        
        const snapshot = await query.get();
       
        const todoList = [];
    
        snapshot.forEach((doc) => {
          todoList.push({ id: doc.id, ...doc.data() });
        });
    
        res.json({"todoList":todoList}   );
      } catch (error) {
        console.error('Error fetching todoList:', error);
        res.status(500).json({ error: 'Failed to fetch todoList' });
      }
}



  exports.editTodo= async (req,res)=>{
   
    try {
       const updatedData= { 
        "userId":req.body.userId,
        "todoId":req.body.todoId,
        "todoName":req.body.todoName,
        "todoDescription":req.body.todoDescription,
        "deadline":req.body.deadline,
        "projectId":req.body.projectId,
        "status":req.body.status}
     
        
      // Check if the todo exists
      const todoRef = db.collection('todos').doc(req.body.todoId);
      const todoDoc = await todoRef.get();
      if (!todoDoc.exists) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      // Update the todo with the provided data
      await todoRef.update(updatedData);
  
      res.json({ message: 'Todo updated successfully' });
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Failed to update todo' });
    }
  }
