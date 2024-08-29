import React from "react";
import { Steps, Button } from "antd";
import {
  LoginOutlined,
  SearchOutlined,
  CalendarOutlined,
  DollarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Step } = Steps;

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-custom-blue">
          How It Works
        </h2>
        <Steps
          direction="vertical"
          size="default"
          current={5}
          className="max-w-2xl mx-auto"
        >
          <Step
            status="finish"
            title="Login or Register"
            description="Create an account or log in to access our booking system."
            icon={<LoginOutlined />}
          />
          <Step
            status="finish"
            title="Instant Booking or Browse Facilities"
            description="Click 'Book Now' for instant booking or visit our Facilities page to browse and select your preferred facility."
            icon={<SearchOutlined />}
          />
          <Step
            status="finish"
            title="Choose a Date and Check Availability"
            description="Select a facility, pick a date, and check for available time slots. If no slots are available, try another date."
            icon={<CalendarOutlined />}
          />
          <Step
            status="finish"
            title="Confirm Your Booking"
            description="Once you find an available slot, proceed to confirm your booking."
            icon={<CheckCircleOutlined />}
          />
          <Step
            status="finish"
            title="Make a Payment"
            description="Pay the required advance amount to secure your booking. Your order will be confirmed upon successful payment."
            icon={<DollarOutlined />}
          />
        </Steps>
        <div className="mt-8">
          <Link to={"/facility-list"}>
            <Button type="primary" size="large">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
