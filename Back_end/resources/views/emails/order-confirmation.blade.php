<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Xác nhận đơn hàng</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        .content {
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            margin-top: 20px;
        }
        .order-details {
            margin-top: 20px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Xác nhận đơn hàng</h1>
            <p>Cảm ơn bạn đã đặt hàng!</p>
        </div>
        
        <div class="content">
            <p>Xin chào {{ $customer_name }},</p>
            
            <p>Chúng tôi đã nhận được đơn hàng của bạn. Dưới đây là thông tin chi tiết:</p>
            
            <div class="order-details">
                <p><strong>Mã đơn hàng:</strong> {{ $order_code }}</p>
                <p><strong>Ngày đặt:</strong> {{ $order_date }}</p>
                <p><strong>Phương thức thanh toán:</strong> {{ $payment_method }}</p>
                <p><strong>Địa chỉ giao hàng:</strong> {{ $shipping_address }}</p>
                
                <h3>Chi tiết sản phẩm:</h3>
                <pre>{{ $order_details }}</pre>
                
                <p><strong>Tổng tiền:</strong> {{ $total_amount }}</p>
            </div>
            
            <p>Chúng tôi sẽ thông báo cho bạn khi đơn hàng được xử lý.</p>
            
            <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
        </div>
        
        <div class="footer">
            <p>© {{ date('Y') }} Your Store Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html> 