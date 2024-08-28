/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Button, DatePicker, Select, Space } from "antd";
import { useGetAllFacilitiesQuery } from "../redux/facilities/facilitiesApi";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useGetAvailableBookingQuery } from "../redux/booking/userBookingApi";
import { Link, useLocation } from "react-router-dom";

const BookingPage = () => {
  const [selectedFacility, setSelectedFacility] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const location = useLocation();
  const {
    selectedDate: previousSelectedDate,
    selectedFacility: previousSelectedFacility,
    facilityId: selectedFacilityFromFacilityDetailsPage,
  } = location.state || {};

  useEffect(() => {
    if (previousSelectedDate && previousSelectedFacility) {
      setSelectedDate(previousSelectedDate);
      setSelectedFacility(previousSelectedFacility);
    } else if (selectedFacilityFromFacilityDetailsPage) {
      setSelectedFacility(selectedFacilityFromFacilityDetailsPage);
    }
  }, [
    previousSelectedDate,
    previousSelectedFacility,
    selectedFacilityFromFacilityDetailsPage,
  ]);

  // facility options
  const { data } = useGetAllFacilitiesQuery(undefined);
  const facilitiesOptions = data?.data.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  // disable past dates
  const disabledDate = (current: Dayjs | null): boolean => {
    return !!current && current < dayjs().startOf("day");
  };

  // Handle facility selection
  const handleChangeFacility = (value: string) => {
    setSelectedFacility(value);
  };

  // Handle date selection
  const onChangeDate = (date: Dayjs | null, _dateString: string | string[]) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      setSelectedDate(formattedDate);
    }
  };

  // Fetch available slots when both date and facility are selected
  const { data: slotData } = useGetAvailableBookingQuery(
    selectedDate && selectedFacility
      ? { date: selectedDate, facility: selectedFacility }
      : undefined,
    {
      skip: !selectedDate || !selectedFacility,
    }
  );

  const convertTo12HourFormat = (time: string): string => {
    let [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: string;
    endTime: string;
  } | null>(null);

  const allSlots = [
    { startTime: "00:00", endTime: "01:00" },
    { startTime: "01:00", endTime: "02:00" },
    { startTime: "06:00", endTime: "07:00" },
    { startTime: "07:00", endTime: "08:00" },
    { startTime: "08:00", endTime: "09:00" },
    { startTime: "09:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "11:00" },
    { startTime: "11:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "13:00" },
    { startTime: "13:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "15:00" },
    { startTime: "15:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "17:00" },
    { startTime: "17:00", endTime: "18:00" },
    { startTime: "18:00", endTime: "19:00" },
    { startTime: "19:00", endTime: "20:00" },
    { startTime: "20:00", endTime: "21:00" },
    { startTime: "21:00", endTime: "22:00" },
    { startTime: "22:00", endTime: "23:00" },
    { startTime: "23:00", endTime: "24:00" },
  ];
  const availableSlots = slotData?.data || [];

  // Filter allSlots to only include those available in availableSlots
  const filteredSlots = allSlots.filter((slot) =>
    availableSlots.some(
      (availableSlot: { startTime: string; endTime: string }) =>
        availableSlot.startTime === slot.startTime &&
        availableSlot.endTime === slot.endTime
    )
  );

  // Filter slots if today is selected to disable past time slots
  const filteredSlotsWithTimeCheck = filteredSlots.filter((slot) => {
    if (selectedDate === dayjs().format("YYYY-MM-DD")) {
      const currentTime = dayjs().format("HH:mm");
      return slot.startTime >= currentTime;
    }
    return true;
  });

  const handleSelectSlot = (slot: { startTime: string; endTime: string }) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="flex flex-col gap-6">
        <Space direction="vertical" className="w-full">
          <div className="flex flex-col">
            <label htmlFor="facility" className="text-lg font-medium">
              Select Facility
            </label>
            <Select
              id="facility"
              value={selectedFacility}
              className="w-full"
              onChange={handleChangeFacility}
              options={facilitiesOptions}
              disabled={!!previousSelectedDate && !!previousSelectedFacility}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="date" className="text-lg font-medium">
              Select Date
            </label>
            <DatePicker
              id="date"
              className="w-full"
              value={selectedDate ? dayjs(selectedDate) : null}
              onChange={onChangeDate}
              disabledDate={disabledDate}
              disabled={!!previousSelectedDate && !!previousSelectedFacility}
            />
          </div>
        </Space>
      </div>
      <div className="p-4">
        {availableSlots.length ? (
          <p className="my-2 text-lg font-medium">Please select a time slot:</p>
        ) : (
          <p className="text-red-400 my-2 text-lg font-medium">
            Please select a facility and date first.
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {allSlots.map((slot, index) => (
            <Link
              key={index}
              to="/confirm-booking"
              state={{
                selectedDate,
                selectedFacility,
                startTime: slot.startTime,
                endTime: slot.endTime,
              }}
            >
              <Button
                type={selectedSlot === slot ? "primary" : "default"}
                onClick={() => handleSelectSlot(slot)}
                className="text-center p-4"
                disabled={
                  !filteredSlotsWithTimeCheck.some(
                    (filteredSlot) =>
                      filteredSlot.startTime === slot.startTime &&
                      filteredSlot.endTime === slot.endTime
                  )
                }
              >
                {`${convertTo12HourFormat(
                  slot.startTime
                )} - ${convertTo12HourFormat(slot.endTime)}`}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
