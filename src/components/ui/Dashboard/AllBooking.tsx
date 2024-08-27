/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag, Modal, Button } from "antd"; // Import necessary Ant Design components

import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useCancelBookingMutation } from "../../../redux/booking/userBookingApi";
import { convertDateToCustomFormat } from "../../../utils/dateConversion";
import { convertTo12HourFormat } from "../../../utils/timeConversion";
import { useGetAllBookingsQuery } from "../../../redux/booking/adminBookingApi";

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
  const [cancelBooking] = useCancelBookingMutation();
  const { data: bookingData } = useGetAllBookingsQuery(undefined);
  console.log(bookingData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const showCancelModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedBookingId) {
      cancelBooking(selectedBookingId);
    }
    toast.success("Your booking is cancelled successfully");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBookingId(null);
  };

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
          <Button type="primary" className="border p-3 rounded">
            Details
          </Button>
        ),
    },
  ];

  return (
    <div className="container mx-auto p-4 mt-4">
      <Toaster />
      <Table
        dataSource={bookingData?.data}
        columns={columns}
        pagination={false}
      />

      <Modal
        title="Cancel Booking"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to cancel this booking?</p>
      </Modal>
    </div>
  );
};

export default AllBooking;
