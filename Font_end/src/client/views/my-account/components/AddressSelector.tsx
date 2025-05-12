import { useState, useEffect } from "react";
import { Select, Form } from "antd";
import addressApi from "@/api/addressApi";

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
        const response = await addressApi.getWards(selectedDistrict);
        setWards(response.data);
        form.setFieldsValue({ ward: undefined });
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrict, form]);

  useEffect(() => {
    // Lấy địa chỉ user khi vào trang
    const fetchUserLocations = async () => {
      try {
        const res = await addressApi.getUserLocations();
        console.log("User locations:", res.data);
        if (res.data && res.data.length > 0) {
          const defaultLocation = res.data.find((loc: any) => loc.is_default) || res.data[0];
          console.log("Default location:", defaultLocation);
          // Đảm bảo provinces đã được load trước khi set giá trị
          if (provinces.length > 0) {
            form.setFieldsValue({
              province: defaultLocation.province_code,
              district: defaultLocation.district_code,
              ward: defaultLocation.ward_code,
            });
            setSelectedProvince(defaultLocation.province_code);
            setSelectedDistrict(defaultLocation.district_code);
          }
        }
      } catch (e) {
        console.error("Error fetching user locations:", e);
      }
    };
    fetchUserLocations();
  }, [form, provinces]);

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
