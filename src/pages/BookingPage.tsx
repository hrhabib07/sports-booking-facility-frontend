import { Button, DatePicker, Select, Space } from "antd";
import { useGetAllFacilitiesQuery } from "../redux/facilities/facilitiesApi";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useGetAvailableBookingQuery } from "../redux/booking/userBookingApi";

const BookingPage = () => {
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChangeDate = (date: Dayjs | null, _dateString: string | string[]) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      setSelectedDate(formattedDate); // This will give you the date in YYYY-MM-DD format
    }
    // else {
    //   console.log("No date selected");
    // }
  };

  // Fetch available slots when both date and facility are selected
  const { data: slotData } = useGetAvailableBookingQuery(
    selectedDate && selectedFacility
      ? { date: selectedDate, facility: selectedFacility }
      : undefined,
    {
      skip: !selectedDate || !selectedFacility, // Skip query if either is missing
    }
  );

  // const availableSlots = slotData?.data;
  // console.log("slot data", availableSlots); // will return an array like this :  [{startTime: "00:00", endTime: "01:00"}, {startTime: "01:00", endTime: "02:00"},…]
  // // I want to show only availableSlots !disabled in my frontend

  const convertTo12HourFormat = (time: string): string => {
    // eslint-disable-next-line prefer-const
    let [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 0 to 12 for midnight and handle 12-hour format
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
  const availableSlots = slotData?.data || []; // Use an empty array if no data
  console.log(selectedFacility);
  console.log(availableSlots);

  // Filter allSlots to only include those available in availableSlots
  const filteredSlots = allSlots.filter((slot) =>
    availableSlots.some(
      (availableSlot: { startTime: string; endTime: string }) =>
        availableSlot.startTime === slot.startTime &&
        availableSlot.endTime === slot.endTime
    )
  );
  const handleSelectSlot = (slot: { startTime: string; endTime: string }) => {
    setSelectedSlot(slot);
    console.log(slot); // This will output the selected slot in 24-hour format
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <Space className="">
            <div className="flex flex-col">
              <label htmlFor="facility">Select a facility</label>
              <Select
                id="facility"
                defaultValue="select a facility "
                className="w-80"
                onChange={handleChangeFacility}
                options={facilitiesOptions}
              />
            </div>
          </Space>
          <Space className="">
            <div className="flex flex-col">
              <label htmlFor="facility">Select a facility</label>
              <DatePicker
                className="w-80"
                onChange={onChangeDate}
                disabledDate={disabledDate}
              />
            </div>
          </Space>
        </div>
        <div>
          <p>Available slots</p>
          <div className="grid grid-cols-3 gap-4">
            {filteredSlots.map((slot, index) => (
              <Button
                key={index}
                type={selectedSlot === slot ? "primary" : "default"}
                onClick={() => handleSelectSlot(slot)}
                className="text-center p-4 text-custom-blue"
              >
                {`${convertTo12HourFormat(
                  slot.startTime
                )} - ${convertTo12HourFormat(slot.endTime)}`}
              </Button>
            ))}
          </div>
          {/* <div className="grid grid-cols-3 gap-4">
            {allSlots.map((slot, index) => (
              <Button
                key={index}
                type={selectedSlot === slot ? "primary" : "default"}
                onClick={() => handleSelectSlot(slot)}
                className="text-center p-4 text-custom-blue "
                disabled
              >
                {`${convertTo12HourFormat(
                  slot.startTime
                )} - ${convertTo12HourFormat(slot.endTime)}`}
              </Button>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
