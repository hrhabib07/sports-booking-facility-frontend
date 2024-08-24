import { Table, Button, Tag } from "antd"; // Import necessary Ant Design components
import {
  useCancelBookingMutation,
  useGetMyBookingQuery,
} from "../../redux/booking/userBookingApi";

const MyBookings = () => {
  const [cancelBooking, { data, error }] = useCancelBookingMutation();
  if (error) {
    console.log(error);
  }
  console.log(data);
  console.log(cancelBooking);
  const { data: bookingData } = useGetMyBookingQuery(undefined);

  //   const [bookings, setBookings] = useState(data?.data); // Manage booking data using state

  //   const updateBookingStatus = (index, newStatus) => {
  //     setBookings((prevBookings) =>
  //       prevBookings.map((booking, i) =>
  //         i === index ? { ...booking, isBooked: newStatus } : booking
  //       )
  //     );
  //   };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Status",
      dataIndex: "isBooked",
      key: "status",
      render: (status: "confirmed" | "canceled") => (
        <Tag color={status === "confirmed" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (record: { isBooked: string; _id: string }) =>
        record.isBooked === "confirmed" && (
          <Button
            onClick={() => cancelBooking(record._id)} // Update status on click
          >
            Cancel Booking
          </Button>
        ),
    },
  ];

  return (
    <div className="container mx-auto p-4 mt-4">
      <h2>My Bookings</h2>
      <Table
        dataSource={bookingData?.data}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default MyBookings;
