const API_BASE = 'http://localhost:3000/users';

export async function login(email, password) {
  const res = await fetch(`${API_BASE}?email=${encodeURIComponent(email)}`);
  if (!res.ok) {
    throw new Error('Error al consultar usuarios');
  }
  const users = await res.json();
  if (!users || users.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  const user = users[0];
  
  if (!user || user.password !== password) {
    throw new Error('Credenciales inválidas');
  }

  const session = {
    token: 'fake-token',
    user: {
      id: user.id,
      name: user.name || user.email,
      email: user.email,
      role: Array.isArray(user.roles) ? user.roles[0] : user.role || 'USER'
    }
  };

  localStorage.setItem('tf_session', JSON.stringify(session));
  return session;
}

export async function register(name, lastname, email, password, role = 'USER') {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      lastname,
      email,
      password,
      roles: [role]
    })
  });
  
  if (!res.ok) {
    throw new Error('Error al crear usuario');
  }
  
  const newUser = await res.json();
  return newUser;
}

export function logout() {
  localStorage.removeItem('tf_session');
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem('tf_session'));
  } catch (e) {
    return null;
  }
}

export function isAuthenticated() {
  return !!getSession();
}

export function getUser() {
  const s = getSession();
  return s?.user ?? null;
}

export default { login, register, logout, getSession, isAuthenticated, getUser };
