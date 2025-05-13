import { useState, useEffect } from "react";
import { Select, Form, Modal } from "antd";
import addressApi from "@/api/addressApi";
import { PlusOutlined } from '@ant-design/icons';
import LocationManager from '@/components/LocationManager';

interface Location {
  id: number;
  location_name: string;
  user_name: string;
  phone_number: string;
  location_detail: string;
  province_code: string;
  province_name: string;
  district_code: string;
  district_name: string;
  ward_code: string;
  ward_name: string;
  status: string;
  is_default: boolean;
}

const UserAddressSelector = ({ form, setUserLocations }: { form: any, setUserLocations?: (locations: Location[]) => void }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch locations only
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await addressApi.getUserLocations();
        setLocations(response.data);
        if (setUserLocations) setUserLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, [setUserLocations]);

  // Set default location when locations loaded
  useEffect(() => {
    if (locations.length > 0) {
      const defaultLocation =
        locations.find((loc) => loc.is_default) ||
        locations.find((loc) => loc.status === "Chính") ||
        locations[0];
      if (defaultLocation) {
        setSelectedLocation(defaultLocation);
        form.setFieldsValue({
          locationId: defaultLocation.id,
          city: defaultLocation.province_code,
          district: defaultLocation.district_code,
          ward: defaultLocation.ward_code,
          street: defaultLocation.location_detail
        });
      }
    }
  }, [locations, form]);

  const handleLocationChange = (locationId: number) => {
    const location = locations.find(loc => loc.id === locationId);
    if (location) {
      setSelectedLocation(location);
      form.setFieldsValue({
        locationId: location.id,
        city: location.province_code,
        district: location.district_code,
        ward: location.ward_code,
        street: location.location_detail
      });
    }
  };

  const handleSelectChange = async (value) => {
    if (value === 'add_new_address') {
      setShowAddModal(true);
      return;
    }
    handleLocationChange(value);
  };

  // Callback khi thêm địa chỉ thành công
  const handleAddAddressSuccess = async () => {
    setShowAddModal(false);
    // Gọi lại API lấy danh sách địa chỉ
    const response = await addressApi.getUserLocations();
    setLocations(response.data);
    if (response.data && response.data.length > 0) {
      // Chọn địa chỉ mới nhất (giả sử là cuối cùng)
      const newId = response.data[response.data.length - 1].id;
      setSelectedLocation(response.data[response.data.length - 1]);
      form.setFieldsValue({ locationId: newId });
      if (typeof setUserLocations === 'function') setUserLocations(response.data);
    }
  };

  // Hàm lấy thông tin đầy đủ
  function getFullAddressInfo(location: any) {
    if (!location) return "";
    const name = location.user_name || location.userName || "Chưa có tên";
    const phone = location.phone_number || location.phoneNumber || "Chưa có SĐT";
    const address = [
      location.location_name || location.locationName,
      location.location_detail || location.locationDetail,
      location.ward_name || location.wardName,
      location.district_name || location.districtName,
      location.province_name || location.provinceName
    ].filter(Boolean).join(", ");
    return (
      <span>
        <b>{name} ( {phone} )</b> - {address}
      </span>
    );
  }

  return (
    <Form.Item
      label="Chọn địa chỉ"
      name="locationId"
      rules={[{ required: true, message: "Vui lòng chọn địa chỉ!" }]}
    >
      <Select
        placeholder="Chọn địa chỉ"
        onChange={handleSelectChange}
        value={selectedLocation ? selectedLocation.id : undefined}
        style={{ width: '100%' }}
        dropdownStyle={{ minWidth: 400 }}
      >
        {locations.map((location) => (
          <Select.Option key={location.id} value={location.id}>
            {getFullAddressInfo(location)}
          </Select.Option>
        ))}
        <Select.Option value="add_new_address" style={{ color: '#2563eb', fontWeight: 600 }}>
          <PlusOutlined /> Thêm địa chỉ mới
        </Select.Option>
      </Select>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        footer={null}
        title="Thêm địa chỉ mới"
        destroyOnClose
        width={700}
      >
        {/* Nhúng form thêm địa chỉ, truyền callback thành công */}
        <LocationManager onAddSuccess={handleAddAddressSuccess} onlyAddMode />
      </Modal>
    </Form.Item>
  );
};

export default UserAddressSelector; 