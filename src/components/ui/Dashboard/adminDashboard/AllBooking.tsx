/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button } from "antd"; // Import necessary Ant Design components

import { convertDateToCustomFormat } from "../../../../utils/dateConversion";
import { convertTo12HourFormat } from "../../../../utils/timeConversion";
import { useGetAllBookingsQuery } from "../../../../redux/booking/adminBookingApi";
import { Link } from "react-router-dom";

// Define the type for the booking data
type BookingRecord = {
  user: any;
  facility: { name: string };
  startTime: string;
  endTime: string;
  date: string;
  isBooked: string;
  _id: string;
};

const AllBooking = () => {
  const { data: bookingData } = useGetAllBookingsQuery(undefined);
  console.log(bookingData);

  // Define columns with consistent type for `record`
  const columns = [
    {
      title: "Facility",
      dataIndex: "facility",
      key: "facility",
      render: (_: any, record: BookingRecord) => <>{record?.facility?.name}</>,
    },
    {
      title: "Date and Time",
      dataIndex: "slot",
      key: "slot",
      render: (_: any, record: BookingRecord) => (
        <>
          {convertDateToCustomFormat(record.date)};{" "}
          {convertTo12HourFormat(record.startTime)} -{" "}
          {convertTo12HourFormat(record.endTime)}
        </>
      ),
    },
    {
      title: "User name",
      dataIndex: "user",
      key: "user",
      render: (_: any, record: BookingRecord) => <>{record?.user?.name}</>,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (record: BookingRecord) =>
        record.isBooked === "confirmed" && (
          <Link to={`/admin-dashboard/booking-details/${record._id}`}>
            <Button type="primary" className="border p-3 rounded">
              Details
            </Button>
          </Link>
        ),
    },
  ];

  return (
    <div className="container mx-auto p-4 mt-4">
      <Table
        dataSource={bookingData?.data}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default AllBooking;
