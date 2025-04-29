<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Thông báo hoàn tiền</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
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
            border-bottom: 1px solid #dee2e6;
        }
        .header h2 {
            color: #dc3545;
            margin: 0;
        }
        .content {
            padding: 20px 0;
        }
        .order-details {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .order-details p {
            margin: 5px 0;
        }
        .qr-code {
            text-align: center;
            margin: 20px 0;
        }
        .qr-code svg {
            max-width: 300px;
            height: auto;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            color: #6c757d;
            font-size: 0.9em;
            border-top: 1px solid #dee2e6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Thông báo hoàn tiền</h2>
        </div>
        
        <div class="content">
            <p>Xin chào {{ $order->customer_name }},</p>
            
            @if($refundMethod === 'DIRECT')
                <p>Đơn hàng #{{ $order->code }} của bạn đã được hoàn tiền thành công.</p>
                <div class="order-details">
                    <p><strong>Mã đơn hàng:</strong> {{ $order->code }}</p>
                    <p><strong>Số tiền hoàn trả:</strong> {{ number_format($order->total_price) }} VNĐ</p>
                    <p><strong>Phương thức thanh toán:</strong> {{ $order->payment_method }}</p>
                    <p><strong>Ngày hoàn tiền:</strong> {{ date('d/m/Y H:i:s') }}</p>
                </div>
            @else
                <p>Đơn hàng #{{ $order->code }} của bạn đã được xử lý hoàn tiền.</p>
                <div class="order-details">
                    <p><strong>Mã đơn hàng:</strong> {{ $order->code }}</p>
                    <p><strong>Số tiền hoàn trả:</strong> {{ number_format($order->total_price) }} VNĐ</p>
                    <p><strong>Phương thức thanh toán:</strong> {{ $order->payment_method }}</p>
                    <p><strong>Ngày tạo mã QR:</strong> {{ date('d/m/Y H:i:s') }}</p>
                </div>
                <!-- <p>Vui lòng sử dụng mã QR dưới đây để nhận tiền hoàn trả:</p> -->
                <div class="qr-code">
                    {!! $qrCode !!}
                </div>
            @endif
            
            <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc hotline: 0335 313 203.</p>
        </div>
        
        <div class="footer">
            <p>© {{ date('Y') }} YounthStyle. All rights reserved.</p>
        </div>
    </div>
</body>
</html> 