import Image1 from "../../assets/images/monitor.jfif";
import Image2 from "../../assets/images/timing.jpg";
import Image3 from "../../assets/images/sched.jfif";
// import Image1 from "../../assets/images/kien.jpg";
// import Image2 from "../../assets/images/kien.jpg";
// import Image3 from "../../assets/images/kien.jpg";
import Slider from "react-slick";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Monitoring",
    description:
      "The irrigation system's monitoring function continuously tracks soil moisture levels, water usage, and environmental conditions such as temperature and humidity using connected sensors. Data is collected and processed in real-time, allowing the system to make informed decisions on when and how much water to apply. This helps optimize water distribution, preventing over- or under-watering, and ensures efficient agricultural irrigation. The monitoring function can also provide alerts for any irregularities and display the collected data on a user-friendly interface for analysis and scheduling adjustments.",
  },
  {
    id: 2,
    img: Image2,
    title: "Timing",
    description:
      "The timer function in the irrigation system allows users to schedule watering cycles at specific intervals. It automates the irrigation process by activating the system to start and stop watering at pre-set times. This ensures that crops receive consistent and timely watering, even without manual intervention. Users can customize the duration and frequency of irrigation based on crop needs or environmental factors, optimizing water usage and improving overall efficiency in agricultural management.",
  },
  {
    id: 3,
    img: Image3,
    title: "Scheduling",
    description:
      "The scheduling function of the irrigation system enables precise planning of watering events based on the needs of crops and environmental conditions. Users can set specific days, times, and durations for irrigation, allowing for flexible, automated management across multiple zones or areas. The system can also adapt schedules based on data from sensors, weather forecasts, or seasonal changes, ensuring optimal water distribution while minimizing waste. This function provides a high level of control, helping to maintain consistent irrigation while improving resource efficiency.",
  },
];

const MainContent = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
    arrows: false,
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">
      {/* background pattern */}
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9"></div>

      {/* section */}
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* text content section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-once="true"
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="100"
                    className="text-sm"
                  >
                    {data.description}
                  </p>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="300"
                  >
                    <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                      More
                    </button>
                  </div>
                </div>

                {/* image content section */}
                <div className="order-1 sm:order-2">
                  <div
                    data-aos="zoom-in"
                    data-aos-once="true"
                    className="relative z-10"
                  >
                    <img
                      src={data.img}
                      alt=""
                      className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MainContent;
