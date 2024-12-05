import Overview from "../pages/Overview";
import Example from "../pages/Example";
import About from "../pages/About";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import OTA from "../pages/OTA";
import Home from "../pages/Home";
import Notification from "../pages/Notification";
import History from "../pages/History";
import UserInfo from "../pages/UserInfo";

export const publicRoutes = [
  {
    path: "/",
    component: Home,
    layout: null,
  },
  {
    path: "/login",
    component: Login,
    layout: null,
  },
  {
    path: "/signup",
    component: SignUp,
    layout: null,
  },
  {
    path: "/overview",
    component: Overview,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "*",
    component: NotFound,
    layout: null,
  },
];

export const privateRoutes = [
  {
    path: "/example",
    component: Example,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/notification",
    component: Notification,
  },
  {
    path: "/history",
    component: History,
  },
  {
    path: "/user-info",
    component: UserInfo,
  },
  {
    path: "/ota-version",
    component: OTA,
    layout: null,
  },
];
