import FooterLogo from "/src/assets/images/logo-agriculture.jpg";
import Banner from "../../assets/images/footer-banner.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaLocationArrow,
  FaMobileAlt,
  FaMailBulk,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  height: "100%",
  width: "100%",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const FooterLinks = [
  {
    title: "Home",
    links: "/#",
  },
  {
    title: "About",
    links: "/#about",
  },
  {
    title: "Contact",
    links: "/#contact",
  },
  {
    title: "FAQ",
    links: "/#faq",
  },
  {
    title: "Blog",
    links: "/#blog",
  },
];

const Footer = () => {
  return (
    <div style={BannerImg} className="text-white mb-20">
      <div className="container">
        <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-44 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={FooterLogo} alt="" className="max-w-[50px]" />
              KKS's Thesis
            </h1>
            <p>
              Our Agricultural Irrigation System provides smart, automated
              solutions for monitoring, scheduling, and controlling irrigation
              processes. Designed to enhance efficiency and optimize water
              usage, our system helps farmers achieve better crop yields while
              saving time and resources. With real-time monitoring and
              customizable schedules, it's the perfect tool for modern
              agriculture.
            </p>
          </div>

          {/* links details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* social */}
            <div>
              <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl"></FaInstagram>
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl"></FaFacebook>
                </a>
                <a href="#">
                  <FaLinkedinIn className="text-3xl"></FaLinkedinIn>
                </a>
                <a href="#">
                  <FaYoutube className="text-3xl"></FaYoutube>
                </a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>
                    301B9, 268 Ly Thuong Kiet Street, District 10, Ho Chi Minh
                    City
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>113 - Police</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMailBulk />
                  <p>KKS@hcmut.edu.vn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
