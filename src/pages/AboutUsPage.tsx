import { Card, Timeline } from "antd";
import { MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Mission Statement */}
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-4">Our Mission</h1>
        <p className="text-lg text-gray-600">
          Our mission is to provide a seamless, easy-to-use platform for booking
          sports facilities, making it accessible for everyone to stay active
          and enjoy their favorite sports.
        </p>
      </section>

      {/* Team Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center space-x-6">
          {[
            {
              name: "John Doe",
              role: "CEO",
              img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            {
              name: "Jane Smith",
              role: "CTO",
              img: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            {
              name: "Emily Davis",
              role: "CFO",
              img: "https://images.pexels.com/photos/1055071/pexels-photo-1055071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ].map((member) => (
            <Card
              key={member.name}
              cover={<img alt={member.name} src={member.img} />}
              className="w-64 shadow-md"
            >
              <Card.Meta title={member.name} description={member.role} />
            </Card>
          ))}
        </div>
      </section>

      {/* History & Milestones */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-center">Our Journey</h2>
        <Timeline mode="alternate">
          <Timeline.Item color="green">
            <h3 className="text-xl font-semibold">Founded</h3>
            <p className="text-gray-600">
              Our company was founded in 2015 with a vision to revolutionize the
              sports facility booking experience.
            </p>
          </Timeline.Item>
          <Timeline.Item color="blue">
            <h3 className="text-xl font-semibold">First Major Partnership</h3>
            <p className="text-gray-600">
              In 2017, we partnered with major sports complexes to bring our
              users a wider selection of facilities.
            </p>
          </Timeline.Item>
          <Timeline.Item color="green">
            <h3 className="text-xl font-semibold">Expansion</h3>
            <p className="text-gray-600">
              By 2019, we expanded our services to over 100 cities, making it
              easier than ever to book sports facilities nationwide.
            </p>
          </Timeline.Item>
          <Timeline.Item color="blue">
            <h3 className="text-xl font-semibold">New Features</h3>
            <p className="text-gray-600">
              In 2021, we launched a mobile app and introduced new features like
              real-time booking and facility reviews.
            </p>
          </Timeline.Item>
        </Timeline>
      </section>

      {/* Contact Information */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <div className="space-y-4">
          <p className="text-lg flex items-center justify-center space-x-2">
            <HomeOutlined className="text-xl" />
            <span>123 Sports Avenue, Cityname, ST 12345</span>
          </p>
          <p className="text-lg flex items-center justify-center space-x-2">
            <PhoneOutlined className="text-xl" />
            <span>(123) 456-7890</span>
          </p>
          <p className="text-lg flex items-center justify-center space-x-2">
            <MailOutlined className="text-xl" />
            <span>info@sportfacilitybooking.com</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
