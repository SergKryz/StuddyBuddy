import axios from "axios";

export async function getTodayTodos(userId) {
  const response = await axios({
    method: "GET",
    url: `https://stubud.onrender.com/todos/${userId}`,
  });
  return response.data;
}

export async function getProjects(userId) {
  const response = await axios({
    method: "GET",
    url: `https://stubud.onrender.com/projects/${userId}`,
  });
  return response.data;
}

export async function addTodo(todoData) {
  const response = await axios.post(
    "https://stubud.onrender.com/add-todo",
    todoData
  );
  return response.data;
}

export async function addProject(projectData) {
  const response = await axios.post(
    "https://stubud.onrender.com/add-project",
    projectData
  );
  return response.data;
}

export async function deleteTodo(todoId) {
  const response = await axios({
    method: "DELETE",
    url: `https://stubud.onrender.com/delete-todo/${todoId}`,
  });
  return response.data;
}
export async function deleteProject(projectId, projectName) {
  const response = await axios({
    method: "DELETE",
    url: `https://stubud.onrender.com/delete-project/${projectId}/${projectName}`,
  });
  return response.data;
}

export async function EditTodoCall(data) {
  const response = await axios({
    method: "PUT",
    url: `https://stubud.onrender.com/edit-todo`,
    data: data,
  });
  return response.data;
}

export async function EditProjectCall(data) {
  const response = await axios({
    method: "PUT",
    url: `https://stubud.onrender.com/edit-project`,
    data: data,
  });
  return response.data;
}

export async function getProjectByProjectId(projectId) {
  const response = await axios({
    method: "GET",
    url: `https://stubud.onrender.com/get-project-by-projectid/${projectId}`,
  });
  return response.data;
}

export async function getTaskByProjectId(projectId) {
  const response = await axios({
    method: "GET",
    url: `https://stubud.onrender.com/get-task-by-projectid/${projectId}`,
  });
  return response.data;
}

export async function getTaskbyName(todoName, userId) {
  const response = await axios({
    method: "GET",
    url: `https://stubud.onrender.com/get-task-by-todoName/${userId}/${todoName}`,
  });
  return response.data;
}

export async function getTaskByUserId(userId) {
  const response = await axios({
    method: "GET",
    url: `https://stubud.onrender.com/get-task-by-userId/${userId}`,
  });
  return response.data;
}
export async function getProjectNameByIdCall(projectId) {
  const response = await axios({
    method: "GET",
    url: `https://stubud.onrender.com/get-project-by-projectid-call/${projectId}`,
  });
  return response.data;
}
