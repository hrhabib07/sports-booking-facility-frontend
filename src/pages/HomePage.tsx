import CommunityImpactSection from "../components/ui/CommunityImpactSection";
import CustomerReview from "../components/ui/CustomerReview/CustomerReview";
import FeaturedFacilities from "../components/ui/FeaturedFacilities";
import HowItWorks from "../components/ui/HowItWorks";
import TopBanner from "../components/ui/TopBanner/TopBanner";

const HomePage = () => {
  return (
    <>
      <TopBanner></TopBanner>
      <FeaturedFacilities></FeaturedFacilities>
      <HowItWorks></HowItWorks>
      <CustomerReview></CustomerReview>
      <CommunityImpactSection></CommunityImpactSection>
    </>
  );
};

export default HomePage;
