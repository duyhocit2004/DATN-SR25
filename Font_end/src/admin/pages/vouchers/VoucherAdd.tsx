import React, { useState } from 'react';
import { Form, Input, Button, Card, message, InputNumber, Select, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AddVoucher } from '../../../service/voucher/voucherService';

const { Option } = Select;

const VoucherAdd: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await AddVoucher(values);
            message.success('Thêm voucher thành công!');
            navigate('/admin/vouchers');
        } catch (error) {
            message.error('Có lỗi xảy ra khi thêm voucher!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Thêm voucher mới" bordered={false} style={{ maxWidth: 600, margin: '0 auto' }} loading={loading}>
            <Form form={form} name="addVoucher" layout="vertical" onFinish={onFinish}>
                <Form.Item label="Tên voucher" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên voucher!' }]}>
                    <Input placeholder="Nhập tên voucher" />
                </Form.Item>
                <Form.Item label="Mã giảm giá" name="code" rules={[{ required: true, message: 'Vui lòng nhập mã giảm giá!' }]}>
                    <Input placeholder="Nhập mã giảm giá" />
                </Form.Item>
                <Form.Item label="Loại giảm giá" name="discount_type" rules={[{ required: true, message: 'Chọn loại giảm giá!' }]}>
                    <Select>
                        <Option value="percent">Phần trăm</Option>
                        <Option value="fixed">Cố định</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Giá trị giảm" name="discount_value" rules={[{ required: true, message: 'Nhập giá trị giảm!' }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Ngày hết hạn" name="end_date" rules={[{ required: true, message: 'Chọn ngày hết hạn!' }]}>
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Số lần sử dụng" name="usage_limit">
                    <InputNumber style={{ width: '100%' }} min={1} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Thêm voucher
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/vouchers')}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default VoucherAdd;
