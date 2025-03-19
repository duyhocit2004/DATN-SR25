import React from "react";
// import { Form, Input, Button, Alert } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";

const ContactUs: React.FC = () => {
  // const [submitted, setSubmitted] = useState(false);

  // const onFinish = (values: any) => {
  //   console.log("Form data:", values);
  //   setSubmitted(true);

  //   // Reset form sau khi gửi thành công
  //   setTimeout(() => {
  //     setSubmitted(false);
  //   }, 3000);
  // };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Thông tin liên hệ */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Thông tin liên hệ</h2>
          <p><EnvironmentOutlined className="mr-2 text-blue-500" /> 123 Đường ABC, Thành phố XYZ</p>
          <p><PhoneOutlined className="mr-2 text-blue-500" /> +84 123 456 789</p>
          <p><MailOutlined className="mr-2 text-blue-500" /> contact@yourstore.com</p>
          <h3 className="text-lg font-medium mt-4">Giờ làm việc:</h3>
          <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
          <p>Thứ 7 - Chủ nhật: 9:00 - 16:00</p>
        </div>

        {/* Form liên hệ */}
        {/* <div>
          {submitted && <Alert message="Gửi thành công! Chúng tôi sẽ liên hệ sớm nhất." type="success" showIcon closable />}
          <Form layout="vertical" onFinish={onFinish} className="space-y-4">
            <Form.Item name="name" label="Họ và Tên" rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}>
              <Input placeholder="Nhập họ tên..." />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ!" }]}>
              <Input placeholder="Nhập email..." />
            </Form.Item>
            <Form.Item name="message" label="Nội dung" rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}>
              <Input.TextArea rows={4} placeholder="Nhập nội dung liên hệ..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">Gửi liên hệ</Button>
            </Form.Item>
          </Form>
        </div> */}
      </div>

      {/* Bản đồ Google Maps */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Bản đồ</h2>
        <iframe
          title="Google Maps"
          className="w-full h-64 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5352212915326!2d105.79929341539254!3d21.007501093844294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abdb91a6eaa7%3A0x2e6cde0f6c77d195!2zVHLhuqduIFRodeG6rW4gUXXhuqNuLCBUaOG6pXQgVGhp4bq_dCDEkMO0bmcsIFRo4buLIEThu6VuZywgVMOibiDEkOG7mW5oIFbGsMahbmggSG_DoGk!5e0!3m2!1sen!2s!4v1631863640609!5m2!1sen!2s"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
