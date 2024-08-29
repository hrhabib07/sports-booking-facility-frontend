import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import { useGetAllFacilitiesQuery } from "../../redux/facilities/facilitiesApi";

const FeaturedFacilities = () => {
  const { data } = useGetAllFacilitiesQuery(undefined);
  const facilities =
    data?.data.filter((facility: { isDeleted: any }) => !facility.isDeleted) ||
    [];

  // Select the first 4 or 6 facilities as featured
  const featuredFacilities = facilities.slice(0, 3); // or .slice(0, 6) for 6 items

  return (
    <div className="p-6 bg-white my-8">
      <h2 className="text-3xl  text-custom-blue font-bold text-center mb-8">
        Featured Facilities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredFacilities.map(
          (facility: {
            _id: React.Key | null | undefined;
            name: string;
            img: string;
            location: string;
            pricePerHour: number;
          }) => (
            <Card
              key={facility._id}
              cover={
                <img
                  alt={facility.name}
                  src={facility.img}
                  className="h-48 object-cover"
                />
              }
              className="shadow-lg rounded-lg overflow-hidden"
            >
              <h3 className="text-xl font-semibold mb-2">{facility.name}</h3>
              <p className="text-gray-600 mb-4">{facility.location}</p>
              <p className="text-blue-600 font-semibold mb-4">
                ${facility.pricePerHour} / hour
              </p>
              <Link to={`/facility-details/${facility._id}`}>
                <Button type="primary" block>
                  View Details
                </Button>
              </Link>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default FeaturedFacilities;
