
import "./styles/global.css";
import { initRouter } from "./router/router";
import { getSession } from "./services/auth.service";

// Restore session from localStorage on app load
const session = getSession();
if (session) {
  console.log('Sesión restaurada:', session.user.email);
}

initRouter();

