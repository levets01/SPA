const API_BASE = 'http://localhost:3000/users';

export async function getUsers() {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    throw new Error('Error al obtener usuarios');
  }
  return await res.json();
}

export async function getUserById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    throw new Error('Usuario no encontrado');
  }
  return await res.json();
}

export async function createUser(user) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  if (!res.ok) {
    throw new Error('Error al crear usuario');
  }
  return await res.json();
}

export async function updateUser(id, updates) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) {
    throw new Error('Error al actualizar usuario');
  }
  return await res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    throw new Error('Error al eliminar usuario');
  }
  return true;
}

export default { getUsers, getUserById, createUser, updateUser, deleteUser };