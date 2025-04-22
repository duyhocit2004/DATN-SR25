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
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
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
            padding: 20px;
            font-size: 12px;
            color: #666;
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
                <p>Số tiền hoàn trả: {{ number_format($order->total_price) }} VNĐ</p>
                <p>Phương thức thanh toán: {{ $order->payment_method }}</p>
            @else
                <p>Đơn hàng #{{ $order->code }} của bạn đã được xử lý hoàn tiền.</p>
                <p>Vui lòng sử dụng mã QR dưới đây để nhận tiền hoàn trả:</p>
                <div class="qr-code">
                    {!! $qrCode !!}
                </div>
                <p>Số tiền hoàn trả: {{ number_format($order->total_price) }} VNĐ</p>
            @endif
            
            <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
        </div>
        
        <div class="footer">
            <p>© {{ date('Y') }} Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html> 