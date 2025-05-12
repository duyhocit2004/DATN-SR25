import { useState, useEffect } from "react";
import { Select, Form } from "antd";
import addressApi from "@/api/addressApi";

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

  return (
    <Form.Item
      label="Chọn địa chỉ"
      name="locationId"
      rules={[{ required: true, message: "Vui lòng chọn địa chỉ!" }]}
    >
      <Select
        placeholder="Chọn địa chỉ"
        onChange={handleLocationChange}
        // KHÔNG dùng value={selectedLocation?.id}, để Form điều khiển
      >
        {locations.map((location) => (
          <Select.Option key={location.id} value={location.id}>
            {location.location_name || location.locationName || ''}
            {location.location_name || location.locationName ? ' - ' : ''}
            {location.location_detail || location.locationDetail || ''}
            {location.ward_name || location.wardName ? `, ${location.ward_name || location.wardName}` : ''}
            {location.district_name || location.districtName ? `, ${location.district_name || location.districtName}` : ''}
            {location.province_name || location.provinceName ? `, ${location.province_name || location.provinceName}` : ''}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default UserAddressSelector; 