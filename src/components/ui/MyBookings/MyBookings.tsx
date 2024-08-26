/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, Tag, Modal } from "antd"; // Import necessary Ant Design components
import {
  useCancelBookingMutation,
  useGetMyBookingQuery,
} from "../../../redux/booking/userBookingApi";
import { useState } from "react";
import { convertTo12HourFormat } from "../../../utils/timeConversion";
import { convertDateToCustomFormat } from "../../../utils/dateConversion";

const MyBookings = () => {
  const [cancelBooking] = useCancelBookingMutation();
  // const [cancelBooking, { data, error }] = useCancelBookingMutation();
  const { data: bookingData } = useGetMyBookingQuery(undefined);
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
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBookingId(null);
  };

  const columns = [
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   key: "date",
    // },
    {
      title: "Facility",
      dataIndex: "facility",
      key: "facility",
      render: (_: any, record: { facility: { name: string } }) => (
        <>{record?.facility?.name}</>
      ),
    },
    {
      title: "Date and Time",
      dataIndex: "slot",
      key: "slot",
      render: (
        _: any,
        record: { startTime: string; endTime: string; date: string }
      ) => (
        <>
          {convertDateToCustomFormat(record.date)} ;{" "}
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
      render: (record: { isBooked: string; _id: string }) =>
        record.isBooked === "confirmed" && (
          <Button onClick={() => showCancelModal(record._id)}>Cancel</Button>
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
