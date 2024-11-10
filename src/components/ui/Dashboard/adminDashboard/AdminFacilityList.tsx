import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { useGetAllFacilitiesQuery } from "../../../../redux/facilities/facilitiesApi";

type FacilityRecord = {
  _id: string;
  name: string;
  img: string;
  pricePerHour: number;
  location: string;
};

const AdminFacilityList = () => {
  const { data } = useGetAllFacilitiesQuery(undefined);
  const facilities: FacilityRecord[] = data?.data || [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img: string) => (
        <img src={img} alt="Facility" className="w-16 h-16 object-cover" />
      ),
    },
    {
      title: "Hourly Rate",
      dataIndex: "pricePerHour",
      key: "pricePerHour",
      render: (price: number) => `$${price}/hr`,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      key: "action",
      render: (record: FacilityRecord) => (
        <Link to={`/admin-dashboard/${record._id}`}>
          <Button type="primary">Facility Management</Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4 mt-4">
      <Table
        dataSource={facilities}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AdminFacilityList;
