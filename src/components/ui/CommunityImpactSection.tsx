import { Card, Typography } from "antd";

const { Paragraph } = Typography;

const CommunityImpactSection = () => {
  return (
    <div className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-custom-blue text-3xl font-bold">
          Our Commitment to Community
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover how booking with us supports local communities and promotes
          sustainability.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card bordered={false} className="bg-white p-6 shadow-md">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4859/4859784.png"
              alt="Local Business"
              className="w-16 h-16 mx-auto"
            />
            <Paragraph className="mt-4 text-md font-semibold">
              Supporting Local Businesses
            </Paragraph>
          </Card>
          <Card bordered={false} className="bg-white p-6 shadow-md">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4729/4729446.png"
              alt="Eco-Friendly"
              className="w-16 h-16 mx-auto"
            />
            <Paragraph className="mt-4 text-md font-semibold">
              Eco-Friendly Facilities
            </Paragraph>
          </Card>
          <Card bordered={false} className="bg-white p-6 shadow-md">
            <img
              src="https://cdn-icons-png.flaticon.com/128/17012/17012977.png"
              alt="Community Projects"
              className="w-16 h-16 mx-auto"
            />
            <Paragraph className="mt-4 text-md font-semibold">
              Community Projects
            </Paragraph>
          </Card>
          <Card bordered={false} className="bg-white p-6 shadow-md">
            <img
              src="https://cdn-icons-png.flaticon.com/128/12489/12489438.png"
              alt="Sustainable Growth"
              className="w-16 h-16 mx-auto"
            />
            <Paragraph className="mt-4 text-md font-semibold">
              Sustainable Growth
            </Paragraph>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityImpactSection;
