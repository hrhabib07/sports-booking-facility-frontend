/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    toast.success("Your message has been submitted successfully");
    console.log("Received values of form: ", values);
    form.resetFields();
    // navigate("/");
    // Delay navigation to allow toast to be visible
    setTimeout(() => {
      // form.resetFields();
      navigate("/");
    }, 1000); // Adjust the timeout duration as needed
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <Toaster></Toaster>
      <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="flex flex-col">
          <Form
            form={form}
            name="contact"
            layout="vertical"
            onFinish={onFinish}
            className="w-full max-w-lg mx-auto"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Your Email" />
            </Form.Item>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: "Please enter a subject" }]}
            >
              <Input placeholder="Subject" />
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea rows={4} placeholder="Your Message" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Contact Details & Map */}
        <div className="flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
            <p>
              <strong>Phone:</strong> +88 01612 09 8484
            </p>
            <p>
              <strong>Email:</strong> support.habib@gmail.com
            </p>
            <p>
              <strong>Address:</strong> 118/B, Hatimbag, Shibgonj, Sylhet
            </p>
          </div>

          {/* Map Integration */}
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>Our Office Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
