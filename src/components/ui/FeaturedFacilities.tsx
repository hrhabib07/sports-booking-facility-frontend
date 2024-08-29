/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";

import { useGetAllFacilitiesQuery } from "../../redux/facilities/facilitiesApi";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const FeaturedFacilities = () => {
  const auth = useAppSelector((state) => state.auth);
  const verifiedToken = verifyToken(auth?.token as string);
  const userRole = verifiedToken?.role;
  const { data } = useGetAllFacilitiesQuery(undefined);
  const facilities =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.data.filter((facility: { isDeleted: any }) => !facility.isDeleted) ||
    [];

  // Select the first 4 or 6 facilities as featured
  const featuredFacilities = facilities.slice(0, 3); // or .slice(0, 6) for 6 items

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-custom-blue">
            Featured Facilities
          </h2>
          <p className="text-gray-500 mt-2 ">
            Explore our top facilities and book the perfect venue for your
            event.
          </p>
        </div>
        <div className="grid p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFacilities.map(
            (facility: {
              id: Key | null | undefined;
              name:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | null
                | undefined;
              img: string | undefined;
              location:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              description:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | null
                | undefined;
              _id: any;
            }) => (
              <Card
                key={facility.id}
                hoverable
                cover={<img alt={facility.name as string} src={facility.img} />}
                className="shadow-md"
              >
                <Card.Meta
                  title={
                    <span className="text-xl font-semibold">
                      {facility.name}
                    </span>
                  }
                  description={
                    <div>
                      <p className="text-gray-500 mb-2">{facility.location}</p>
                      <p>{facility.description}</p>
                    </div>
                  }
                />
                <div className="my-4">
                  {userRole !== "admin" && (
                    <Link to={`/facility-details/${facility._id}`}>
                      <Button type="primary">View Details</Button>
                    </Link>
                  )}
                  {userRole === "admin" && (
                    <Link to={`/admin-dashboard/${facility._id}`}>
                      <Button type="primary">View Details</Button>
                    </Link>
                  )}
                </div>
              </Card>
            )
          )}
        </div>
        <div className="text-center mt-8">
          <Link to={"/facility-list"}>
            <Button type="primary" size="large" icon={<StarOutlined />}>
              View All Facilities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFacilities;
