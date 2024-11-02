import logo from "../../../../assets/images/logo.svg"

const routes = [
  {
    path: "/home",
    name: "Home",
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/service",
    name: "Service",
  },
  {
    path: "/contactus",
    name: "Contact Us",
  }
];

const Header = () => {
  return (
    <div className="flex h-[60px] border-b-2 border-gray-200 items-center justify-between px-6">
      <img src={logo} alt="Tiktok logo" className="w-[118px] h-[42px]" />
      <div className="h-[46px] flex items-center rounded-[92px] border border-transparent bg-gray-200 hover:border-gray-400 flex-grow max-w-[500px] justify-between">
        <div className="flex justify-between items-center w-full h-full">
          <input
            placeholder="Search"
            className="h-full ps-4 placeholder:text-gray-600 bg-transparent w-full focus:outline-none caret-[#FE2C55]"
            type="text"
          />
          <button className="me-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-gray-400">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="flex items-center h-[46px]">
          <span className="bg-gray-400 h-[28px] w-[0.925px]"></span>
          <button className="ps-3 pe-4 rounded-r-[92px] hover:bg-gray-300 h-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <button className="flex items-center border border-gray-300 h-[36px] px-4 gap-x-1 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="font-medium">Upload</span>
        </button>
        <button className="flex items-center bg-[#FE2C55] h-[36px] px-6 rounded-md">
          <span className="font-bold text-white">Log in</span>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Header;