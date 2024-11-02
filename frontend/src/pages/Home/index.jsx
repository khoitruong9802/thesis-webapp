import Header from "./Header";
import MainContent1 from "./MainContent1";
// import MainContent2 from "./MainContent2";
import Banner from "./Banner";
import Subscribe from "./Subscribe";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="flex flex-col justify-start w-full">
      {/* <div className=""> */}
      <Header />
      <MainContent1 />
      {/* <MainContent2 /> */}
      <Banner />
      <Subscribe />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
