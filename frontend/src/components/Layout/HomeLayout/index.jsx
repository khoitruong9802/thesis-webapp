import Header from "../components/Header";

const HomeLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  )
}

export default HomeLayout;