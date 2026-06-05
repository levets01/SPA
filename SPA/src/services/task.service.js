const API_BASE = 'http://localhost:3000/tasks';

export async function getTasks(userId = null) {
  const url = userId ? `${API_BASE}?userId=${userId}` : API_BASE;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Error al obtener tareas');
  }
  return await res.json();
}

export async function getTaskById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    throw new Error('Tarea no encontrada');
  }
  return await res.json();
}

export async function createTask(title, description, userId, status = 'pending') {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      description,
      status,
      userId,
      createdAt: new Date().toISOString()
    })
  });
  
  if (!res.ok) {
    const errorData = await res.text();
    console.error('API Error:', errorData);
    throw new Error('Error al crear tarea');
  }
  return await res.json();
  return await res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  
  if (!res.ok) {
    throw new Error('Error al actualizar tarea');
  }
  return await res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  });
  
  if (!res.ok) {
    throw new Error('Error al eliminar tarea');
  }
  return true;
}

export default { getTasks, getTaskById, createTask, updateTask, deleteTask };
