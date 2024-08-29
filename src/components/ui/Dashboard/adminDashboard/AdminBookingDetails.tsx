/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import {
  useDeleteBookingAdminMutation,
  useGetSingleBookingQuery,
} from "../../../../redux/booking/adminBookingApi";
import { Button, Card, Descriptions, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const AdminBookingDetails = () => {
  const location = useLocation();
  const bookingId = location.pathname.split("/")[3];

  const { data, isLoading, error } = useGetSingleBookingQuery(bookingId);
  const [deleteBookingAdmin] = useDeleteBookingAdminMutation();

  if (isLoading) {
    return <p>Loading booking details...</p>;
  }

  if (error) {
    return <p>Error loading booking details.</p>;
  }

  const handleCancelBooking = () => {
    confirm({
      title: "Are you sure you want to cancel this booking?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk() {
        deleteBookingAdmin(bookingId);
      },
    });
  };

  const bookingData = data?.data || {};

  return (
    <Card
      title="Booking Details"
      bordered={false}
      style={{ maxWidth: "800px", margin: "auto" }}
    >
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Booking ID">
          {bookingData._id}
        </Descriptions.Item>
        <Descriptions.Item label="Date">{bookingData.date}</Descriptions.Item>
        <Descriptions.Item label="Time">
          {bookingData.startTime} - {bookingData.endTime}
        </Descriptions.Item>
        <Descriptions.Item label="User Name">
          {bookingData.user?.name}
        </Descriptions.Item>
        <Descriptions.Item label="User Email">
          {bookingData.user?.email}
        </Descriptions.Item>
        <Descriptions.Item label="User Phone">
          {bookingData.user?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Facility">
          {bookingData.facility?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Location">
          {bookingData.facility?.location}
        </Descriptions.Item>
        <Descriptions.Item label="Amount Payable">
          ${bookingData.payableAmount}
        </Descriptions.Item>
        <Descriptions.Item label="Booking Status">
          {bookingData.isBooked}
        </Descriptions.Item>
      </Descriptions>

      {bookingData.isBooked === "confirmed" && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button
            type="primary"
            danger
            onClick={handleCancelBooking}
            style={{ width: "100%" }}
          >
            Cancel Booking
          </Button>
        </div>
      )}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link to={"/admin-dashboard/all-booking"}>
          <Button type="primary" style={{ width: "100%" }}>
            Previous page
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default AdminBookingDetails;
