export function convertDateToCustomFormat(dateString: string): string {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Define month names in short form
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract day, month, and year
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

  // Return the formatted date string
  return `${day}${month}${year}`;
}
