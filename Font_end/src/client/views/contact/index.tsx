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
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Thông Tin Liên Hệ</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Thông tin liên hệ */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Thông tin liên hệ</h2>
          <p><EnvironmentOutlined className="mr-2 text-blue-500" /> 2PQW+6JJ Tòa nhà FPT Polytechnic., Cổng số 2, 13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội 100000</p>
          <p><PhoneOutlined className="mr-2 text-blue-500" /> 0981 725 836</p>
          <p><MailOutlined className="mr-2 text-blue-500" /> caodang@fpt.edu.vn</p>
          <h3 className="text-lg font-medium mt-4">Giờ làm việc:</h3>
          <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
          <p>Thứ 7 - Chủ nhật: 9:00 - 16:00</p>
        </div>
      </div>
        {/* Bản đồ Google Maps */}
        <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Bản đồ</h2>
        <iframe
          title="Google Maps"
          className="w-full h-64 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8638060211565!2d105.74468151153106!3d21.038134787374318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1742889389193!5m2!1svi!2s"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
};

export default ContactUs;
