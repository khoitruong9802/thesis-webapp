import React from "react";
import { IoMdSearch } from "react-icons/io";
import { FiMonitor, FiVideo } from "react-icons/fi";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  // {
  //   id: 2,
  //   name: "Monitor",
  //   link: "/#",
  // },
  // {
  //   id: 3,
  //   name: "Timing",
  //   link: "/#",
  // },
  // {
  //   id: 4,
  //   name: "Scheduler",
  //   link: "/#",
  // },
  // {
  //   id: 5,
  //   name: "Contacts",
  //   link: "/#",
  // },
  // {
  //   id: 6,
  //   name: "Supports",
  //   link: "/#",
  // },
];

const DropdownMonitor = [
  {
    id: 1,
    name: "System Status",
    link: "/#",
  },
  {
    id: 2,
    name: "Humidity Sensors",
    link: "/#",
  },
  {
    id: 3,
    name: "OTA Version",
    link: "/otaversion",
  },
  {
    id: 3,
    name: "Activity History",
    link: "/#",
  },
];

const DropdownTiming = [
  {
    id: 1,
    name: "Setting",
    link: "/#",
  },
  {
    id: 2,
    name: "Timer History",
    link: "/#",
  },
  // {
  //   id: 3,
  //   name: "Change Time",
  //   link: "/#",
  // },
  {
    id: 3,
    name: "Notifications",
    link: "/#",
  },
];

const DropdownScheduler = [
  {
    id: 1,
    name: "Setting",
    link: "/#",
  },
  {
    id: 2,
    name: "Management",
    link: "/#",
  },
  // {
  //   id: 3,
  //   name: "Update",
  //   link: "/#",
  // },
  // {
  //   id: 4,
  //   name: "Managements",
  //   link: "/#",
  // },
];

const DropdownSupport = [
  {
    id: 1,
    name: "FAQ",
    link: "/#",
  },
  {
    id: 2,
    name: "Instructions",
    link: "/#",
  },
  // {
  //   id: 3,
  //   name: "Version OTA",
  //   link: "/#",
  // },
  {
    id: 4,
    name: "Contacts",
    link: "/#",
  },
];

const DropdownAccount = [
  {
    id: 1,
    name: "Information",
    link: "/#",
  },
  {
    id: 2,
    name: "Sign In",
    link: "/login",
  },
  {
    id: 3,
    name: "Sign Up",
    link: "/#",
  },
  {
    id: 4,
    name: "Log Out",
    link: "/#",
  },
];

const Header = () => {
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img
                src="/src/assets/images/logo-agriculture.jpg"
                alt="logo"
                className="w-10"
              />
              KKS's Thesis
            </a>
          </div>

          {/* search bar and buttons */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search your schedule ..."
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
          </div>
          {/* {order buttons} */}
          <button className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group">
            <span
              className="group-hover:block hidden transition-all duration-200"
              onClick={() => alert("Monitoring...")}
            >
              KKS
            </span>
            <FiMonitor className="text-xl text-white drop-shadow-sm cursor-pointer"></FiMonitor>
            <IoIosNotifications className="text-xl text-white drop-shadow-sm cursor-pointer"></IoIosNotifications>

            {/* <span
              className="group-hover:block hidden transition-all duration-200"
              onClick={() => alert("Timing...")}
            >
              Timing
            </span>
            <CiClock1 className="text-xl text-white drop-shadow-sm cursor-pointer"></CiClock1>

            <span
              className="group-hover:block hidden transition-all duration-200"
              onClick={() => alert("Scheduling...")}
            >
              Schedule
            </span>
            <GrSchedule className="text-xl text-white drop-shadow-sm cursor-pointer"></GrSchedule>

            <span
              className="group-hover:block hidden transition-all duration-200"
              onClick={() => alert("Please contact to me...")}
            >
              Contact
            </span>
            <IoIosContact className="text-xl text-white drop-shadow-sm cursor-pointer"></IoIosContact>

            <span
              className="group-hover:block hidden transition-all duration-200"
              onClick={() => alert("Take me suppoting...")}
            >
              Support
            </span>
            <FcSupport className="text-xl text-white drop-shadow-sm cursor-pointer"></FcSupport> */}
          </button>
        </div>
      </div>

      {/* lower navbar */}
      <div className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4 ">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}

          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Monitoring
              <span>
                <IoIosArrowDropdown className="text-gray-500" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownMonitor.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* simple dropdown */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Timing
              <span>
                <IoIosArrowDropdown className="text-gray-500" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownTiming.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Scheduler
              <span>
                <IoIosArrowDropdown className="text-gray-500" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownScheduler.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Supports
              <span>
                <IoIosArrowDropdown className="text-gray-500" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownSupport.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Account
              <span>
                <IoIosArrowDropdown className="text-gray-500" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownAccount.map((data) => (
                  <li key={data.id}>
                    <Link
                      to={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                    >
                      {data.name}
                    </Link>
                    {/* <Link
                      className="inline-block ml-5"
                      to={"/overview"}
                    >
                      <img src="/icon.png" alt="overview" className=" w-10 h-10" />
                    </Link> */}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
