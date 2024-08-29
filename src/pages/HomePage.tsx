import CustomerReview from "../components/ui/CustomerReview/CustomerReview";
import FeaturedFacilities from "../components/ui/FeaturedFacilities";
import TopBanner from "../components/ui/TopBanner/TopBanner";

const HomePage = () => {
  return (
    <>
      <TopBanner></TopBanner>
      <FeaturedFacilities></FeaturedFacilities>
      <CustomerReview></CustomerReview>
    </>
  );
};

export default HomePage;
