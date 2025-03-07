import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, InputNumber, Select, DatePicker } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { GetVoucherById, UpdateVoucher } from '../../../service/voucher/voucherService';


const { Option } = Select;

const EditVoucher: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVoucherData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await GetVoucherById(id);  // API trả về { data: { ...voucherData } }
                console.log("Voucher nhận được:", response);
    
                if (response && response.data) {
                    const voucher = response.data;  
    
                    form.setFieldsValue({
                        name: voucher.name,
                        code: voucher.code,
                        discount_type: voucher.discount_type,
                        discount_value: parseFloat(voucher.discount_value),  // Chuyển thành số nếu cần
                        min_order_value: voucher.min_order_value ? parseFloat(voucher.min_order_value) : null,
                        max_discount: voucher.max_discount ? parseFloat(voucher.max_discount) : null,
                        expiration_date: voucher.expiration_date ? dayjs(voucher.expiration_date) : null,
                        usage_limit: voucher.usage_limit ? parseInt(voucher.usage_limit, 10) : null,
                    });
                } else {
                    message.error("Không tìm thấy voucher!");
                }
            } catch (error) {
                message.error("Không thể tải dữ liệu voucher!");
            } finally {
                setLoading(false);
            }
        };
        fetchVoucherData();
    }, [id, form]);
    
    
    
    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            if (id) {
                await UpdateVoucher(id, {
                    ...values,
                    end_date: values.end_date ? values.end_date.format('YYYY-MM-DD') : null,
                });
                message.success('Cập nhật voucher thành công!');
            }
            navigate('/admin/vouchers');
        } catch (error) {
            message.error('Có lỗi xảy ra khi cập nhật voucher!');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <Card title="Chỉnh sửa voucher" bordered={false} style={{ maxWidth: 600, margin: '0 auto' }} loading={loading}>
            <Form form={form} name="EditVoucher" layout="vertical" onFinish={onFinish}>
                {/* <Form.Item label="Tên voucher" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên voucher!' }]}>
                    <Input placeholder="Nhập tên voucher" />
                </Form.Item> */}
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
                        Cập nhật voucher
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/vouchers')}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default EditVoucher;


function dayjs(end_date: string) {
    throw new Error('Function not implemented.');
}

