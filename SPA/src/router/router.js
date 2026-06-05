import { notFoundView, routes } from "./routes";
import { isAuthenticated, getUser } from "../services/auth.service";

export function renderRoute() {
  const app = document.getElementById("app");
  const currentPath = window.location.pathname;

  const route = routes[currentPath] ?? { render: notFoundView };
  
  
  // Check if route is public
  if (!route.isPublic && !isAuthenticated()) {
    window.history.pushState({}, "", "/login");
    return renderRoute();
  }

  // Check if user has required role
  if (route.requiredRole) {
    const user = getUser();
    const hasRole = route.requiredRole.includes(user?.role);
    if (!hasRole) {
      window.history.pushState({}, "", "/dashboard");
      return renderRoute();
    }
  }

  // Redirect if already authenticated (for login/register)
  if (route.redirectIfAuthenticated && isAuthenticated()) {
    window.history.pushState({}, "", "/dashboard");
    return renderRoute();
  }

  app.innerHTML = route.render();
  if (route.setup) {
    route.setup();
  }
}
export function initRouter() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) {
      return;
    }

    const href = link.getAttribute("href");

    if (!href || !href.startsWith("/")) {
      return;
    }
    event.preventDefault();

    window.history.pushState({}, "", href);
    renderRoute();
  });

  window.addEventListener("popstate", renderRoute);
  renderRoute();
}
