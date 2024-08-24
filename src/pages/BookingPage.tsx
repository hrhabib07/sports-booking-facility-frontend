import { Select, Space } from "antd";
import { useGetAllFacilitiesQuery } from "../redux/facilities/facilitiesApi";

const BookingPage = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const { data } = useGetAllFacilitiesQuery(undefined);

  const facilitiesOptions = data?.data.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );
  // console.log(facilitiesOptions);

  console.log(data);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Space className="">
            <div className="flex flex-col">
              <label htmlFor="facility">Select a facility</label>
              <Select
                id="facility"
                defaultValue="select a facility "
                className="w-80"
                onChange={handleChange}
                options={facilitiesOptions}
              />
            </div>
          </Space>
        </div>
        <div>dvi2</div>
      </div>
    </div>
  );
};

export default BookingPage;
