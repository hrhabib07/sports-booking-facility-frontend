import { Carousel, Rate, Typography } from "antd";

const { Text } = Typography;

const customerReviews = [
  {
    name: "John Doe",
    review:
      "Booking was seamless and the facility was top-notch. Highly recommend!",
    rating: 5,
  },
  {
    name: "Jane Smith",
    review:
      "Great experience! The booking process was easy and the staff was very helpful.",
    rating: 4,
  },
  {
    name: "Mark Wilson",
    review: "The facility was clean and well-maintained. Will book again.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    review: "Good value for money. The booking system is user-friendly.",
    rating: 4,
  },
];

const CustomerReview = () => {
  return (
    <div className="md:max-w-7xl mx-auto">
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center text-custom-blue mb-8 ">
          Customer Testimonials
        </h2>
        <Carousel autoplay={true} autoplaySpeed={3000}>
          {customerReviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 "
            >
              <div>
                <Rate disabled defaultValue={review.rating} className="mb-4" />
              </div>
              <div>
                <Text className="text-lg text-gray-600 italic">{`"${review.review}"`}</Text>
              </div>
              <div>
                <Text className="mt-4 font-semibold text-gray-800">
                  {review.name}
                </Text>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CustomerReview;
