/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag, Modal } from "antd"; // Import necessary Ant Design components
import {
  useCancelBookingMutation,
  useGetMyBookingQuery,
} from "../../../redux/booking/userBookingApi";
import { useState } from "react";
import { convertTo12HourFormat } from "../../../utils/timeConversion";
import { convertDateToCustomFormat } from "../../../utils/dateConversion";
import { toast, Toaster } from "sonner";

// Define the type for the booking data
type BookingRecord = {
  facility: { name: string };
  startTime: string;
  endTime: string;
  date: string;
  isBooked: string;
  _id: string;
};

const MyBookings = () => {
  const [cancelBooking] = useCancelBookingMutation();
  const { data: bookingData } = useGetMyBookingQuery(undefined);

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
      render: (record: BookingRecord) =>
        record.isBooked === "confirmed" && (
          <button
            className="border p-3 rounded border-red-100 bg-gray-50 hover:bg-gray-200"
            onClick={() => showCancelModal(record._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-3 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
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

export default MyBookings;
