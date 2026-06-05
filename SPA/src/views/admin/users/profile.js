import { getUser, logout } from "../../../services/auth.service.js";
import { updateUser, deleteUser } from "../../../services/users.service.js";
import { renderRoute } from "../../../router/router.js";

export function renderProfile() {
  const user = getUser();
  if (!user) return '<div>Error: Usuario no autenticado</div>';

  return `
  <head>
  <body class="min-h-screen bg-sky-50 text-slate-800">
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/profile">Perfil</a>
          <button id="logout-btn" class="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Cerrar sesión</button>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <section class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside class="rounded-[2rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Cuenta</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight">Mi perfil</h1>
          <p class="mt-4 text-blue-50">El usuario puede actualizar sus datos personales y gestionar su propia cuenta dentro del sistema.</p>
        </aside>

        <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
          <form id="profile-form" class="grid gap-5">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-name">Nombre</label>
              <input id="profile-name" type="text" value="${user.name || ''}" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" required />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-email">Correo</label>
              <input id="profile-email" type="email" value="${user.email || ''}" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" required />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="password-new">Nueva contraseña (opcional)</label>
              <input id="password-new" type="password" placeholder="Deja en blanco para no cambiar" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
            </div>
            <div class="flex flex-col gap-3 pt-2 sm:flex-row">
              <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">Guardar cambios</button>
              <button type="button" id="delete-account-btn" class="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-700 hover:bg-red-50">Eliminar mi cuenta</button>
            </div>
          </form>
        </section>
      </section>
    </main>
`;
}

export function setupProfile() {
  const user = getUser();
  if (!user) return;

  const form = document.getElementById('profile-form');
  const deleteBtn = document.getElementById('delete-account-btn');
  const logoutBtn = document.getElementById('logout-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('profile-name').value.trim();
      const email = document.getElementById('profile-email').value.trim();
      const newPassword = document.getElementById('password-new').value;

      try {
        const updates = { name, email };
        if (newPassword) updates.password = newPassword;
        await updateUser(user.id, updates);
        alert('Perfil actualizado exitosamente');
        renderRoute();
      } catch (err) {
        alert(err.message || 'Error al actualizar perfil');
      }
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
      if (confirm('¿Estás seguro? Esto eliminará tu cuenta y todas tus tareas.')) {
        try {
          await deleteUser(user.id);
          logout();
          window.history.pushState({}, '', '/login');
          renderRoute();
        } catch (err) {
          alert(err.message || 'Error al eliminar cuenta');
        }
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      window.history.pushState({}, '', '/login');
      renderRoute();
    });
  }
}
