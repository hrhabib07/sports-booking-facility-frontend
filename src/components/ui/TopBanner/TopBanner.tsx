import Navbar from "../Navbar/Navbar";

const TopBanner = () => {
  return (
    <div className="border">
      <Navbar></Navbar>
      <div className=" h-96 flex justify-between items-center">
        <div className="">
          <h2 className="text-5xl mx-7">hello this is my top banner</h2>
        </div>
        <div>
          <img
            src="https://www.healthychildren.org/SiteCollectionImagesArticleImages/soccerball_team_practice.jpg?RenditionID=3"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
