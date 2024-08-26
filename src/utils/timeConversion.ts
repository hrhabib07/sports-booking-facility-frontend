export const convertTo12HourFormat = (time: string): string => {
  // eslint-disable-next-line prefer-const
  let [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert 0 to 12 for midnight and handle 12-hour format
  return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
};
