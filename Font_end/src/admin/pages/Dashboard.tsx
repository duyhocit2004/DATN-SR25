import React from 'react';
import { Card, Col, Row, Statistic, Space, Divider } from 'antd';
import { AppstoreOutlined, UserOutlined, DollarOutlined, WarningOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
    const statistics = [
        {
            title: 'Tổng số sản phẩm',
            value: 120,
            icon: <AppstoreOutlined />,
            color: 'green',
        },
        {
            title: 'Tổng số người dùng',
            value: 3500,
            icon: <UserOutlined />,
            color: 'blue',
        },
        {
            title: 'Tổng doanh thu',
            value: '200,000,000 VNĐ',
            icon: <DollarOutlined />,
            color: 'red',
        },
        {
            title: 'Sản phẩm sắp hết hàng',
            value: 15,
            icon: <WarningOutlined />,
            color: 'orange',
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h1>Dashboard</h1>
            <Divider />

            <Row gutter={16}>
                {statistics.map((stat, index) => (
                    <Col span={6} key={index}>
                        <Card
                            bordered={false}
                            hoverable
                            style={{
                                borderRadius: 8,
                                backgroundColor: '#f0f2f5',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={stat.icon}
                                valueStyle={{ color: stat.color }}
                                suffix={stat.title === 'Tổng doanh thu' ? 'VND' : ''}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Divider />

            <h2>Biểu đồ thống kê (Dự kiến)</h2>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Doanh thu theo tháng" bordered={false}>
                        {/* Bạn có thể thêm biểu đồ ở đây */}
                        <p>Biểu đồ doanh thu</p>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Sản phẩm bán chạy" bordered={false}>
                        {/* Thêm biểu đồ sản phẩm bán chạy */}
                        <p>Biểu đồ sản phẩm bán chạy</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
