export function renderNotFound() {
  return `
    <main class="flex min-h-screen flex-col items-center justify-center px-6 py-14">
      <div class="text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Error</p>
        <h1 class="mt-3 text-7xl font-black tracking-tight text-slate-900">404</h1>
        <p class="mt-4 max-w-md text-lg text-slate-600">La página que buscas no existe o fue movida a otro lugar.</p>
        <div class="mt-8">
          <a class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500" href="/">Volver al inicio</a>
        </div>
      </div>
    </main>
  `;
}
