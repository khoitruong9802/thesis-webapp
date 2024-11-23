import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  UserOutlined,
  CloseOutlined,
  HomeOutlined,
  AliwangwangOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
// import { logoutAdmin } from "../../../services/adminService";
import { useSelector } from "react-redux";

const currentPage = () => {
  let index = routes.above.findIndex(
    (item) => item.path === window.location.pathname
  );
  if (index == -1) {
    index = routes.below.findIndex(
      (item) => item.path === window.location.pathname
    );
    if (index != -1) {
      index += routes.above.length;
    }
  }
  return index == -1 ? routes.length : index;
};

export const routes = {
  above: [
    {
      path: "/dashboard",
      name: "Dash board",
      icon: HomeOutlined,
    },
    {
      path: "/notification",
      name: "Notification",
      icon: AliwangwangOutlined,
    },
    {
      path: "/history",
      name: "History",
      icon: BarChartOutlined,
    },
  ],
  below: [
    {
      path: "/user-info",
      name: "User info",
      icon: UserOutlined,
    },
    {
      path: "/log-out",
      name: "Log out",
      icon: LogoutOutlined,
    },
  ],
};

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  // const admin = useSelector((state) => state.admin);
  const [route, setRoute] = useState(currentPage);

  const logout = async () => {
    try {
      // await logoutAdmin();
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`transition-all duration-500 fixed top-0 ${
        isSidebarOpen ? "left-0" : "-left-64"
      }`}
    >
      <div className="flex h-screen overflow-y-auto flex-col bg-white  w-64 px-4 py-8 border-r min-h-screen relative">
        <button
          onClick={closeSidebar}
          className="absolute top-1 right-1  text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
        >
          <CloseOutlined />
        </button>
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          <span className="text-indigo-500 ml-1">Menu</span>
        </h2>
        <hr className="mt-6" />
        <div className="flex flex-col justify-between flex-1">
          <nav className="text">
            {routes.above.map((link, index) => {
              const { path, name } = link;
              return (
                <Link
                  key={index}
                  to={path}
                  onClick={() => setRoute(index)}
                  className={`capitalize flex items-center px-4 py-2 mt-5 hover:text-blue-800 transition-colors duration-200 transform rounded-md ${
                    index === route
                      ? "bg-gray-200 text-blue-800"
                      : "text-gray-500"
                  }`}
                >
                  {link.path === "/notification" ? (
                    <Badge count={7}>
                      <link.icon className="text-xl" />
                    </Badge>
                  ) : (
                    <link.icon className="text-xl" />
                  )}
                  <span className="mx-4 font-medium">{name}</span>
                </Link>
              );
            })}
            <hr className="my-6" />
            {routes.below.map((link, index) => {
              const { path, name } = link;
              index += routes.above.length;
              return (
                <Link
                  key={index}
                  to={path}
                  onClick={() => setRoute(index)}
                  className={`capitalize flex items-center px-4 py-2 mt-5 hover:text-blue-800 transition-colors duration-200 transform rounded-md ${
                    index === route
                      ? "bg-gray-200 text-blue-800"
                      : "text-gray-500"
                  }`}
                >
                  <link.icon className="text-xl" />
                  <span className="mx-4 font-medium">{name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center px-4 -mx-2 mt-5">
            <img
              src="https://th.bing.com/th/id/OIP.UUD5ia8fx--kBVTt-Qu81wHaE8?w=281&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="avatar"
              className="h-9 w-9 mx-2 object-center object-cover rounded-full"
            />
            <h4 className="mx-2 font-medium text-gray-800 hover:underline cursor-pointer">
              {"admin.fullName"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
