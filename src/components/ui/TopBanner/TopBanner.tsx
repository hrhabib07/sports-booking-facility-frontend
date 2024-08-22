import { Carousel } from "antd";

const TopBanner = () => {
  const images = [
    "https://images.pexels.com/photos/13558754/pexels-photo-13558754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/13311973/pexels-photo-13311973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6878018/pexels-photo-6878018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/13250606/pexels-photo-13250606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/179908/pexels-photo-179908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/11767211/pexels-photo-11767211.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <div className="bg-blue-50 w-full">
      <div className="h-auto md:h-[500px] flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
        <div className="flex-1 flex w-full flex-col justify-center items-center">
          <div className="mx-4">
            <h2 className="text-4xl text-custom-blue my-2">
              Welcome to sportLine
            </h2>
            <p className="text-gray-500 text-xl my-2">
              The ultimate solution for booking sports facilities <br /> in the
              simplest way
            </p>
            <button className="bg-custom-blue text-white p-2 my-2 rounded hover:text-custom-blue hover:bg-white border border-custom-blue">
              Explore more
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center h-80 w-80">
          <div className="w-80">
            <Carousel autoplay={true} fade={true}>
              {images.map((src, index) => (
                <div key={index}>
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-80 h-80 object-cover rounded-md"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
