
import { useState, useEffect } from "react";
import { Select, Form } from "antd";
import addressApi from "@/api/addressApi";

const AddressSelector = ({ form }: { form: any }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await addressApi.getProvinces();
      setProvinces(response.data);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        const response = await addressApi.getDistricts(selectedProvince);
        setDistricts(response.data);
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      form.setFieldsValue({ district: null, ward: null });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        const response = await addressApi.getWards(selectedDistrict);
        setWards(response.data);
      };
      fetchWards();
    } else {
      setWards([]);
      form.setFieldsValue({ ward: null });
    }
  }, [selectedDistrict]);

  return (
    <>
      <Form.Item
        label="Tỉnh/Thành phố"
        name="province"
        rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố!" }]}
      >
        <Select
          placeholder="Chọn tỉnh/thành phố"
          onChange={(value) => setSelectedProvince(value)}
        >
          {provinces.map((item) => (
            <Select.Option key={item.code} value={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Quận/Huyện"
        name="district"
        rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
      >
        <Select
          placeholder="Chọn quận/huyện"
          onChange={(value) => setSelectedDistrict(value)}
          disabled={!selectedProvince}
        >
          {districts.map((item) => (
            <Select.Option key={item.code} value={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Phường/Xã"
        name="ward"
        rules={[{ required: true, message: "Vui lòng chọn phường/xã!" }]}
      >
        <Select
          placeholder="Chọn phường/xã"
          disabled={!selectedDistrict}
        >
          {wards.map((item) => (
            <Select.Option key={item.code} value={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default AddressSelector;
