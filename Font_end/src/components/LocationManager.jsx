import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Switch, message, Popconfirm } from 'antd';
import locationApi from '../services/locationService';
import addressApi from '../api/addressApi';
import { showToast } from '@/components/toast';

const { Option } = Select;

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingEdit, setPendingEdit] = useState(null);
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const normalizeLocation = (loc) => ({
    key: loc.id,
    id: loc.id,
    ten_dia_chi: loc.locationName || loc.location_name || '-',
    nguoi_nhan: loc.userName || loc.user_name || '-',
    sdt: loc.phoneNumber || loc.phone_number || '-',
    chi_tiet: loc.locationDetail || loc.location_detail || '-',
    loai: loc.status || '-',
    mac_dinh: loc.isDefault !== undefined ? loc.isDefault : (loc.is_default !== undefined ? loc.is_default : false),
    province_code: loc.provinceCode || loc.province_code,
    province_name: loc.provinceName || loc.province_name,
    district_code: loc.districtCode || loc.district_code,
    district_name: loc.districtName || loc.district_name,
    ward_code: loc.wardCode || loc.ward_code,
    ward_name: loc.wardName || loc.ward_name,
  });

  const fetchLocations = async () => {
    try {
      console.log('Fetching locations...');
      const res = await locationApi.getAll();
      console.log('Location API response:', res);
      
      if (!res) {
        console.error('No response received');
        showToast({ type: 'error', content: 'Lỗi tải địa chỉ: Không nhận được phản hồi từ server!' });
        setLocations([]);
        return;
      }

      const data = Array.isArray(res) ? res : res.data;
      console.log('Data to process:', data);

      if (!Array.isArray(data)) {
        console.error('Invalid data format:', data);
        showToast({ type: 'error', content: 'Lỗi tải địa chỉ: Dữ liệu không đúng định dạng!' });
        setLocations([]);
        return;
      }

      const locs = data.map(normalizeLocation);
      console.log('Data for Table:', locs);
      setLocations(locs);
    } catch (err) {
      console.error('Error fetching locations:', err);
      if (err.response) {
        console.error('Error response:', err.response);
        showToast({ 
          type: 'error', 
          content: `Lỗi tải địa chỉ: ${err.response.data?.message || err.response.statusText}` 
        });
      } else if (err.request) {
        console.error('Error request:', err.request);
        showToast({ 
          type: 'error', 
          content: 'Không thể kết nối đến server!' 
        });
      } else {
        showToast({ 
          type: 'error', 
          content: `Lỗi tải địa chỉ: ${err.message}` 
        });
      }
      setLocations([]);
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await addressApi.getProvinces();
      console.log('Provinces response:', response.data);
      setProvinces(response.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
      message.error('Lỗi tải danh sách tỉnh/thành phố');
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await addressApi.getDistricts(provinceId);
      console.log('Districts response for province', provinceId, ':', response.data);
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
      message.error('Lỗi tải danh sách quận/huyện');
    }
  };

  const fetchWards = async (districtId) => {
    try {
      const response = await addressApi.getWards(districtId);
      console.log('Wards response for district', districtId, ':', response.data);
      setWards(response.data);
    } catch (error) {
      console.error('Error fetching wards:', error);
      message.error('Lỗi tải danh sách phường/xã');
    }
  };

  useEffect(() => { 
    fetchLocations();
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      console.log('Fetching districts for province:', selectedProvince);
      fetchDistricts(selectedProvince);
    } else {
      setDistricts([]);
      setWards([]);
      form.setFieldsValue({ district: undefined, ward: undefined });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      console.log('Fetching wards for district:', selectedDistrict);
      fetchWards(selectedDistrict);
    } else {
      setWards([]);
      form.setFieldsValue({ ward: undefined });
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (pendingEdit && provinces.length > 0 && selectedProvince === pendingEdit.province_code) {
      setSelectedDistrict(pendingEdit.district_code);
    }
  }, [pendingEdit, provinces, selectedProvince]);

  useEffect(() => {
    if (
      pendingEdit &&
      provinces.length > 0 &&
      (!pendingEdit.province_code || provinces.some(p => String(p.code) === String(pendingEdit.province_code)))
    ) {
      form.setFieldsValue({
        location_name: pendingEdit.ten_dia_chi,
        user_name: pendingEdit.nguoi_nhan,
        phone_number: pendingEdit.sdt,
        street: pendingEdit.chi_tiet.split(',')[0].trim(),
        status: pendingEdit.loai,
        is_default: pendingEdit.mac_dinh,
        province: pendingEdit.province_code || '',
      });
      setSelectedProvince(pendingEdit.province_code || null);
    }
  }, [pendingEdit, provinces]);

  useEffect(() => {
    if (
      pendingEdit &&
      districts.length > 0 &&
      (!pendingEdit.district_code || districts.some(d => String(d.code) === String(pendingEdit.district_code)))
    ) {
      form.setFieldsValue({
        district: pendingEdit.district_code || '',
      });
      setSelectedDistrict(pendingEdit.district_code || null);
    }
  }, [pendingEdit, districts]);

  useEffect(() => {
    if (
      pendingEdit &&
      wards.length > 0 &&
      (!pendingEdit.ward_code || wards.some(w => String(w.code) === String(pendingEdit.ward_code)))
    ) {
      form.setFieldsValue({
        ward: pendingEdit.ward_code || '',
      });
      setPendingEdit(null);
    }
  }, [pendingEdit, wards]);

  const handleAdd = () => {
    setEditing(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditing(record);
    setPendingEdit(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    await locationApi.delete(id);
    message.success('Đã xóa địa chỉ');
    fetchLocations();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const province = provinces.find(p => p.code === values.province);
      const district = districts.find(d => d.code === values.district);
      const ward = wards.find(w => w.code === values.ward);
      
      const locationDetail = `${values.street}, ${ward?.name}, ${district?.name}, ${province?.name}`;
      
      const payload = {
        ...values,
        location_detail: locationDetail,
        province_code: values.province ? String(values.province) : '',
        province_name: province?.name || '',
        district_code: values.district ? String(values.district) : '',
        district_name: district?.name || '',
        ward_code: values.ward ? String(values.ward) : '',
        ward_name: ward?.name || '',
      };

      if (editing) {
        await locationApi.update(editing.id, payload);
        message.success('Cập nhật thành công');
      } else {
        await locationApi.create(payload);
        message.success('Thêm thành công');
      }
      setModalVisible(false);
      fetchLocations();
    } catch (error) {
      // Không làm gì, lỗi đã hiển thị trên form
    }
  };

  const columns = [
    { title: '🏷️ Tên địa chỉ', dataIndex: 'ten_dia_chi' },
    { title: '👤 Người nhận', dataIndex: 'nguoi_nhan' },
    { title: '📞 SĐT', dataIndex: 'sdt' },
    { title: '📍 Chi tiết', dataIndex: 'chi_tiet' },
    { title: 'Loại', dataIndex: 'loai' },
    { title: 'Mặc định', dataIndex: 'mac_dinh', render: val => val ? '✔️' : '-' },
    {
      title: 'Hành động',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} type="link">Sửa</Button>
          <Popconfirm title="Xóa địa chỉ?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd}>Thêm địa chỉ</Button>
      <Table dataSource={locations} columns={columns} rowKey="id" style={{ marginTop: 16 }} />
      {console.log('locations state:', locations)}
      <Modal
        title={editing ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => {
          form.resetFields();
          setModalVisible(false);
        }}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="location_name" label="Tên địa chỉ" rules={[{ required: true, message: "Vui lòng nhập tên địa chỉ" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="user_name" label="Người nhận" rules={[{ required: true, message: "Vui lòng nhập người nhận" }]}>
            <Input />
          </Form.Item>
          <Form.Item 
            name="phone_number" 
            label="Số điện thoại" 
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^[0-9]{10}$/, message: "Số điện thoại phải có 10 chữ số" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="province"
            label="Tỉnh/Thành phố"
            rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
          >
            <Select
              placeholder="Chọn tỉnh/thành phố"
              onChange={(value) => setSelectedProvince(value)}
              showSearch
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {provinces.map((province) => (
                <Option key={province.code} value={province.code}>
                  {province.name}
                </Option>
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
              disabled={!selectedProvince}
              showSearch
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {districts.map((district) => (
                <Option key={district.code} value={district.code}>
                  {district.name}
                </Option>
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
              disabled={!selectedDistrict}
              showSearch
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {wards.map((ward) => (
                <Option key={ward.code} value={ward.code}>
                  {ward.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="street"
            label="Số nhà, tên đường"
            rules={[{ required: true, message: "Vui lòng nhập số nhà, tên đường" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Loại địa chỉ" rules={[{ required: true, message: "Vui lòng chọn loại địa chỉ" }]}>
            <Select>
              <Option value="Chính">Chính</Option>
              <Option value="Phụ">Phụ</Option>
            </Select>
          </Form.Item>
          <Form.Item name="is_default" label="Địa chỉ mặc định" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LocationManager; 