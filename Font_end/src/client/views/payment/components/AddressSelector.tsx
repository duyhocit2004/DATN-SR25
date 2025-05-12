import { useState, useEffect } from "react";
import { Select, Form } from "antd";
import { useAddress } from "@/hooks/useAddress";

const AddressSelector = ({ form }: { form: any }) => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  
  const {
    provinces,
    districts,
    wards,
    loading,
    fetchProvinces,
    fetchDistricts,
    fetchWards
  } = useAddress();

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetchDistricts(selectedProvince);
      setSelectedDistrict(null);
      form.setFieldsValue({ district: undefined, ward: undefined });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWards(selectedDistrict);
      form.setFieldsValue({ ward: undefined });
    }
  }, [selectedDistrict]);

  return (
    <>
      <Form.Item
        name="province"
        label="Tỉnh/Thành phố"
        rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
      >
        <Select
          placeholder="Chọn tỉnh/thành phố"
          onChange={(value) => setSelectedProvince(value)}
          loading={loading}
        >
          {provinces.map((province) => (
            <Select.Option key={province.code} value={province.code}>
              {province.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="district"
        label="Quận/Huyện"
        rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
      >
        <Select
          placeholder="Chọn quận/huyện"
          onChange={(value) => setSelectedDistrict(value)}
          loading={loading}
          disabled={!selectedProvince}
        >
          {districts.map((district) => (
            <Select.Option key={district.code} value={district.code}>
              {district.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="ward"
        label="Phường/Xã"
        rules={[{ required: true, message: "Vui lòng chọn phường/xã" }]}
      >
        <Select
          placeholder="Chọn phường/xã"
          loading={loading}
          disabled={!selectedDistrict}
        >
          {wards.map((ward) => (
            <Select.Option key={ward.code} value={ward.code}>
              {ward.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default AddressSelector;
