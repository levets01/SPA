import { renderLogin, setupLogin } from "../views/auth/login";
import { renderNotFound } from "../views/auth/not-found";
import { renderRegister, setupRegister } from "../views/auth/register";
import { renderHome } from "../views/home";
import { renderTaskForm, setupTaskForm } from "../views/tasks/task-form";
import { renderTask, setupTask } from "../views/tasks/tasks";
import { renderAdmin, setupAdmin } from "../views/admin/users/admin";
import { renderDashboard} from "../views/app/dashboard";
import { renderProfile, setupProfile } from "../views/admin/users/profile";
import { login } from "../services/auth.service";

export const routes = {
  "/": {
    render: renderHome,
    isPublic: true,
  },
  "/login": {
    render: renderLogin,
    setup: setupLogin,
    isPublic: true,
  },
  "/register": {
    render: renderRegister,
    setup: setupRegister,
    isPublic: true,
    redirectIfAuthenticated: true,
  },
  "/dashboard": {
    render: renderDashboard,
    isPublic: false
  },

  "/tasks": {
    render: renderTask,
    setup: setupTask,
    isPublic: false,
  },
  "/tasks-form": {
    render: renderTaskForm,
    setup: setupTaskForm,
    isPublic: false,
  },
  "/profile": {
    render: renderProfile,
    setup: setupProfile,
    isPublic: false,
  },
  "/admin": {
    render: renderAdmin,
    setup: setupAdmin,
    isPublic: false,
    requiredRole: ["ADMIN"],
  },
};

export const notFoundView = renderNotFound;
