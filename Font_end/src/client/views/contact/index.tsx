import React, { useState, useRef } from "react";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser";

const ContactUs: React.FC = () => {
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_z8qreuh", // Thay bằng Service ID của bạn
          "template_a3wcow8", // Thay bằng Template ID của bạn
          form.current,
          "3aQUQJg7LQjr1oLT5" // Thay bằng Public Key của bạn
        )
        .then(
          () => {
            setFormStatus("Gửi thành công! Cảm ơn bạn đã liên hệ.");
            form.current?.reset();
            setTimeout(() => setFormStatus(null), 5000); // Ẩn thông báo sau 5 giây
          },
          (error) => {
            setFormStatus("Gửi thất bại. Vui lòng thử lại.");
            console.error("EmailJS error:", error.text);
          }
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Thông Tin Liên Hệ</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Thông tin liên hệ */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Địa chỉ</h2>
          <p>
            <EnvironmentOutlined className="mr-2 text-blue-500" />
            Tòa nhà FPT Polytechnic - Cổng số 2, 13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội
          </p>
          <p>
            <PhoneOutlined className="mr-2 text-blue-500" /> 0981 725 836
          </p>
          <p>
            <MailOutlined className="mr-2 text-blue-500" /> caodang@fpt.edu.vn
          </p>
          <h3 className="text-lg font-medium mt-4">Giờ làm việc</h3>
          <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
          <p>Thứ 7 - Chủ nhật: 9:00 - 16:00</p>
        </div>

        {/* Form liên hệ */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Liên hệ  cho chúng tôi</h2>
          {formStatus && (
            <div
              className={`p-4 mb-4 rounded ${
                formStatus.includes("thành công") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {formStatus}
            </div>
          )}
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Tin nhắn
              </label>
              <textarea
                name="message"
                id="message"
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Nhập tin nhắn của bạn"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Gửi
            </button>
          </form>
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