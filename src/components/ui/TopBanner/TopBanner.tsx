import { Carousel } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { verifyToken } from "../../../utils/verifyToken";
import { useState } from "react";

const images = [
  "https://img.freepik.com/free-photo/crop-legs-kicking-ball-grass_23-2147817394.jpg?t=st=1733043016~exp=1733046616~hmac=8550507df1b7044417d9193671a33074ef3b1f61cde63a90efe3fdbd2bb84553&w=826",
  "https://t3.ftcdn.net/jpg/08/41/73/38/240_F_841733826_Mgz9dN4TQqQ0ctJaVTpUmcMmboLPVPp3.jpg",
  "https://img.freepik.com/free-photo/football-player-tackling-ball-green-grass-background_155003-32279.jpg?t=st=1733043230~exp=1733046830~hmac=18bbd583c58f05d26133d637b7b4c974f0f4785f9b5b670b6cbdf72b08e6c7da&w=826",
  "https://t3.ftcdn.net/jpg/10/79/67/04/240_F_1079670463_hvi4Q32chzq728feTKQjAHZbzlBWcr4V.jpg",
  "https://t4.ftcdn.net/jpg/08/70/20/27/240_F_870202780_NsPhzHDKgd0OUlQMaSOeX0mQPLSHbYZ9.jpg",
  // "https://images.pexels.com/photos/11767211/pexels-photo-11767211.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const subheadings = [
  "Book your game, live the experience today!",
  "Find top sports facilities right near you!",
  "Play more and stress less—reserve now!",
  "Your game, your way, your best choice!",
  "Elevate your sports experience with ease!",
  "Effortless bookings for every athlete's dream!",
];

const TopBanner = () => {
  const auth = useAppSelector((state) => state.auth);
  const verifiedToken = verifyToken(auth?.token as string);
  const userRole = verifiedToken?.role;
  const [currentText, setCurrentText] = useState(subheadings[0]);

  const handleCarouselChange = (currentSlide: number) => {
    setCurrentText(subheadings[currentSlide % subheadings.length]);
  };

  return (
    <div className="bg-blue-50 w-full">
      <div className="md:max-w-7xl mx-auto">
        <div className="h-auto md:h-[500px] flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
          {/* Left Text Section */}
          <div className="flex-1 flex w-full flex-col justify-center items-center">
            <div className="mx-4">
              <h2 className="text-4xl text-custom-blue my-2 text-center md:text-left">
                Welcome to sportLine
              </h2>
              {/* Subheading with Fixed Height */}
              <div className="h-[60px] flex items-center">
                <p className="text-gray-500 text-xl my-2 transition-opacity duration-1000 ease-in-out text-center md:text-left">
                  {currentText}
                </p>
              </div>
              {/* Buttons */}
              {userRole !== "admin" && (
                <Link to={"/booking"}>
                  <button className="bg-custom-blue text-white p-2 my-2 rounded hover:text-custom-blue hover:bg-white border border-custom-blue transition duration-300 ease-in-out">
                    Book Now
                  </button>
                </Link>
              )}
              {userRole === "admin" && (
                <Link to={"/admin-dashboard"}>
                  <button className="bg-custom-blue text-white p-2 my-2 rounded hover:text-custom-blue hover:bg-white border border-custom-blue transition duration-300 ease-in-out">
                    Dashboard
                  </button>
                </Link>
              )}
            </div>
          </div>
          {/* Carousel Section */}
          <div className="flex-1 flex justify-center items-center h-80 w-80">
            <div className="w-80">
              <Carousel
                autoplay={true}
                fade={true}
                autoplaySpeed={3000} // Smooth speed
                afterChange={handleCarouselChange}
              >
                {images.map((src, index) => (
                  <div key={index}>
                    <div className="relative w-80 h-80">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <img
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
