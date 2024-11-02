import React from "react";
import Img1 from "../../assets/images/pro1.jpg";
import Img2 from "../../assets/images/pro2.jfif";
import { FaStar } from "react-icons/fa6";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "tit-1",
    rating: 5.0,
    author: "white",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "tit-2",
    rating: 4.5,
    author: "red",
    aosDelay: "200",
  },
];

const MainContent2 = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* header */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary ">
            Top selling products
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold ">
            products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit.
          </p>
        </div>

        {/* body */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* card section */}
            {ProductsData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3"
              >
                <img
                  src={data.img}
                  alt=""
                  className="h-[220px] w-[150px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.color}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent2;
