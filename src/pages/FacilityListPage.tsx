/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { Input, Button, Card } from "antd";
import { useGetAllFacilitiesQuery } from "../redux/facilities/facilitiesApi";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const { Search } = Input;

const FacilityListPage = () => {
  const auth = useAppSelector((state) => state.auth);
  const verifiedToken = verifyToken(auth?.token as string);
  const userRole = verifiedToken?.role;
  const { data } = useGetAllFacilitiesQuery(undefined);
  const facilities =
    data?.data.filter((facility: { isDeleted: any }) => !facility.isDeleted) ||
    [];

  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<number | null>(null);

  const filteredFacilities = facilities.filter(
    (facility: { name: string; pricePerHour: number }) => {
      return (
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!priceFilter || facility.pricePerHour <= priceFilter)
      );
    }
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Search
          placeholder="Search by facility name or location"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg"
        />
        <Input
          type="number"
          placeholder="Max price per hour"
          className="ml-4 w-32"
          onChange={(e) => setPriceFilter(Number(e.target.value) || null)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map(
          (facility: {
            _id: Key | null | undefined;
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
            pricePerHour:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
          }) => (
            <Card
              key={facility._id}
              cover={
                <img
                  alt={facility?.name as string}
                  src={facility.img}
                  className="h-48 object-cover"
                />
              }
              className="shadow-md rounded-lg overflow-hidden"
            >
              <h2 className="text-lg font-bold mb-2">{facility.name}</h2>
              <p className="text-gray-600 mb-4">{facility.location}</p>
              <p className="text-blue-600 font-semibold mb-4">
                ${facility.pricePerHour} / hour
              </p>
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
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default FacilityListPage;
