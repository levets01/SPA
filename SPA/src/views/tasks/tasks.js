import { getTasks, deleteTask } from "../../services/task.service.js";
import { getUser } from "../../services/auth.service.js";
import { renderRoute } from "../../router/router.js";

export function renderTask() {
  return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/tasks">Tareas</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <section class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de tareas</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight">Mis tareas</h1>
          <p class="mt-4 max-w-2xl text-blue-50">Vista principal para listar, editar y eliminar tus tareas.</p>
        </div>
        <a class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/tasks-form">
          + Crear tarea
        </a>
      </section>

      <section id="tasks-list" class="mt-8 grid gap-4">
        <div class="text-center py-8 text-slate-500">Cargando tareas...</div>
      </section>
    </main>
  `;
}

export async function setupTask() {
  const tasksList = document.getElementById('tasks-list');
  if (!tasksList) return;

  try {
    const user = getUser();
    if (!user) return;

    const tasks = await getTasks(user.id);
    
    if (tasks.length === 0) {
      tasksList.innerHTML = `
        <div class="rounded-3xl border border-blue-100 bg-blue-50 p-8 text-center">
          <p class="text-slate-600">No tienes tareas aún. ¡Crea tu primera tarea!</p>
        </div>
      `;
      return;
    }

    tasksList.innerHTML = tasks.map(task => `
      <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${task.status === 'completed' ? 'Completada' : task.status === 'in-progress' ? 'En progreso' : 'Pendiente'}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-900">${task.title}</h2>
            <p class="mt-3 max-w-2xl text-slate-600">${task.description || ''}</p>
          </div>
          <div class="flex gap-3">
            <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/tasks-form?id=${task.id}">Editar</a>
            <button class="delete-task rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50" data-id="${task.id}">Eliminar</button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach delete handlers
    document.querySelectorAll('.delete-task').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const taskId = e.target.dataset.id;
        if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
          try {
            await deleteTask(taskId);
            renderRoute();
          } catch (err) {
            alert(err.message);
          }
        }
      });
    });
  } catch (err) {
    tasksList.innerHTML = `<div class="text-red-600">Error: ${err.message}</div>`;
  }
}