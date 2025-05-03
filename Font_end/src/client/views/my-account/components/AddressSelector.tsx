import { useState, useEffect } from "react";
import { Select, Form } from "antd";
import axios from "axios";

interface AddressItem {
  code: string;
  name: string;
  districts?: AddressItem[];
  wards?: AddressItem[];
}

const AddressSelector = ({ form }: { form: any }) => {
  const [provinces, setProvinces] = useState<AddressItem[]>([]);
  const [districts, setDistricts] = useState<AddressItem[]>([]);
  const [wards, setWards] = useState<AddressItem[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await axios.get("https://provinces.open-api.vn/api/p/");
      setProvinces(response.data);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
        );
        setDistricts(response.data.districts);
        setWards([]);
        form.setFieldsValue({ district: undefined, ward: undefined });
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince, form]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
        );
        setWards(response.data.wards);
        form.setFieldsValue({ ward: undefined });
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrict, form]);

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
          showSearch
          filterOption={(input, option) => {
            const label = option?.children;
            return label ? String(label).toLowerCase().includes(input.toLowerCase()) : false;
          }}
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
          showSearch
          filterOption={(input, option) => {
            const label = option?.children;
            return label ? String(label).toLowerCase().includes(input.toLowerCase()) : false;
          }}
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
          showSearch
          filterOption={(input, option) => {
            const label = option?.children;
            return label ? String(label).toLowerCase().includes(input.toLowerCase()) : false;
          }}
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
