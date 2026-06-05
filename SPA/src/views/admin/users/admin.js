import { getUsers, deleteUser, updateUser } from "../../../services/users.service.js";
import { getTasks } from "../../../services/task.service.js";
import { renderRoute } from "../../../router/router.js";

export function renderAdmin() {
    return `
    <body class="min-h-screen bg-sky-50 text-slate-800">
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/admin">Admin</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-6 py-10">
      <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Rol administrador</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight">Panel administrativo</h1>
        <p class="mt-4 max-w-2xl text-blue-50">Vista reservada para gestionar usuarios, roles, permisos y monitoreo general del sistema.</p>
      </section>

      <section id="users-list" class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div class="text-center py-8 text-slate-500">Cargando usuarios...</div>
      </section>
    </main>
  `;
}

export async function setupAdmin() {
  const usersList = document.getElementById('users-list');
  if (!usersList) return;

  try {
    const users = await getUsers();
    const tasks = await getTasks();

    usersList.innerHTML = `
      <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
        <h2 class="text-xl font-bold text-slate-900">Resumen</h2>
        <div class="mt-5 grid gap-4">
          <div class="rounded-2xl bg-blue-50 p-4">
            <p class="text-sm text-slate-600">Total de usuarios</p>
            <p class="mt-2 text-3xl font-bold text-blue-700">${users.length}</p>
          </div>
          <div class="rounded-2xl bg-blue-50 p-4">
            <p class="text-sm text-slate-600">Total de tareas</p>
            <p class="mt-2 text-3xl font-bold text-blue-700">${tasks.length}</p>
          </div>
          <div class="rounded-2xl bg-blue-50 p-4">
            <p class="text-sm text-slate-600">Administradores</p>
            <p class="mt-2 text-3xl font-bold text-blue-700">${users.filter(u => u.roles?.includes('ADMIN')).length}</p>
          </div>
        </div>
      </article>

      <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
        <h2 class="text-xl font-bold text-slate-900">Usuarios registrados</h2>
        <div class="mt-5 space-y-3 max-h-96 overflow-y-auto">
          ${users.map(user => `
            <div class="rounded-2xl bg-blue-50 p-4">
              <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p class="font-bold text-slate-900">${user.name} ${user.lastname || ''}</p>
                  <p class="text-sm text-slate-500">${user.email}</p>
                </div>
                <div class="flex gap-2 flex-wrap">
                  <select class="change-role rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 bg-white" data-user-id="${user.id}">
                    <option value="USER" ${user.roles?.[0] === 'USER' ? 'selected' : ''}>USER</option>
                    <option value="ADMIN" ${user.roles?.[0] === 'ADMIN' ? 'selected' : ''}>ADMIN</option>
                  </select>
                  <button class="delete-user rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50" data-user-id="${user.id}">Eliminar</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </article>
    `;

    // Attach role change handlers
    document.querySelectorAll('.change-role').forEach(select => {
      select.addEventListener('change', async (e) => {
        const userId = e.target.dataset.userId;
        const newRole = e.target.value;
        try {
          await updateUser(userId, { roles: [newRole] });
          alert('Rol actualizado');
        } catch (err) {
          alert(err.message);
          renderRoute();
        }
      });
    });

    // Attach delete handlers
    document.querySelectorAll('.delete-user').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const userId = e.target.dataset.userId;
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
          try {
            await deleteUser(userId);
            renderRoute();
          } catch (err) {
            alert(err.message);
          }
        }
      });
    });
  } catch (err) {
    usersList.innerHTML = `<div class="text-red-600">Error: ${err.message}</div>`;
  }
}