const db = require('../firebase')

exports.addProject= async (req,res)=>{
    try {
        const { projectName, userId, projectDescription, projectDeadline } = req.body;
    
        // Generate a new project ID
        const projectDocRef = db.collection('projects').doc();
        const projectId = projectDocRef.id;
    
        // Create a new project object
        const project = {
          projectName,
          projectId,
          userId,
          projectDescription,
          projectDeadline
        };
    
        // Store the project in the "projects" collection
        await projectDocRef.set(project);
    
        res.status(201).json({ message: 'Project created successfully', id: projectId });
      } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
      }
}



exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId; // Get the projectId from the URL parameter
    const projectName = req.params.projectName; // Get the projectId from the URL parameter
    
    // Check if the project exists
    const projectDocRef = db.collection('projects').doc(projectId);
    const projectDoc = await projectDocRef.get();
    if (!projectDoc.exists) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete the project
    await projectDocRef.delete();

    // Delete all todos associated with the project
    const todosQuerySnapshot = await db
      .collection('todos')
      .where('projectId', '==', projectId)
      .get();

    const batch = db.batch();
    todosQuerySnapshot.forEach((todoDoc) => {
      batch.delete(todoDoc.ref);
    });

    await batch.commit();

    res.json({ message: 'Project and associated todos deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

exports.getProjectByUserId= async (req,res) =>{
    try {
        const userId = req.params.userId; // Get the userId from the query parameters
     
     
        let query = db.collection('projects').where('userId', '==', userId);
        
        const snapshot = await query.get();
        const projectList = [];
    
        snapshot.forEach((doc) => {
          projectList.push({ id: doc.id, ...doc.data() });
        });
    
        res.json({"projectlist":projectList}   );
      } catch (error) {
        console.error('Error fetching Projects:', error);
        res.status(500).json({ error: 'Failed to fetch Projects' });
      }
}

exports.getProjectByProjectId= async (req,res)=>{
    try {
        const projectId = req.params.projectId; // Get the userId from the query parameters
  
     
        let query = db.collection('projects').where('projectId', '==', projectId);
        
        const snapshot = await query.get();
     
        const projectList = [];
    
        snapshot.forEach((doc) => {
          projectList.push({ id: doc.id, ...doc.data() });
        });
    
        res.json({"projectlist":projectList}   );
      } catch (error) {
        console.error('Error fetching Project:', error);
        res.status(500).json({ error: 'Failed to fetch Project' });
      }
}
exports.getProjectByIdCall= async (req,res)=>{
    try {
        const projectId = req.params.projectId; // Get the userId from the query parameters
        
     
        let query = db.collection('projects').where('projectId', '==', projectId);
        
        const snapshot = await query.get();
     
        const projectList = [];
    
        snapshot.forEach((doc) => {
          projectList.push({ id: doc.id, ...doc.data() });
        });
         
        res.json({"projectName":projectList[0].projectName}   );
      } catch (error) {
        console.error('Error fetching Project:', error);
        res.status(500).json({ error: 'Failed to fetch Project' });
      }
}

exports.editProject= async (req,res)=>{
  
    try {
       const updatedData= { 
        "userId":req.body.userId,
        "projectDescription":req.body.projectDescription,
        "projectDeadline":req.body.projectDeadline,
        "projectName":req.body.projectName,
        "projectId":req.body.projectId}
     
        
      // Check if the todo exists
      const projectRef = db.collection('projects').doc(req.body.projectId);
      const projectDoc = await projectRef.get();
      if (!projectDoc.exists) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      // Update the todo with the provided data
      await projectRef.update(updatedData);
  
      res.json({ message: 'Project updated successfully' });
    } catch (error) {
      console.error('Error updating Project:', error);
      res.status(500).json({ error: 'Failed to update Project' });
    }
}

