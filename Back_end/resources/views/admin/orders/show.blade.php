@extends('admin.layout.app')

@if ($order->receiver_name)
    <h3 class="mt-4">Thông tin người nhận</h3>
    <p><strong>Họ và tên:</strong> {{ $order->receiver_name }}</p>
    <p><strong>Số điện thoại:</strong> {{ $order->receiver_phone_number }}</p>
    <p><strong>Địa chỉ:</strong> {{ $order->receiver_address }}</p>
@endif

@section('content')
    <div class="container">
        <h1 class="my-4">Chi tiết đơn hàng #{{ $order->id }}</h1>

        <p><strong>Khách hàng:</strong> {{ $order->user_name }}</p>
        <p><strong>Email:</strong> {{ $order->email }}</p>
        <p><strong>Địa chỉ:</strong> {{ $order->address }}</p>
        <p><strong>Tổng tiền:</strong> {{ number_format($order->total_price, 0, ',', '.') }} VNĐ</p>
        <p><strong>Trạng thái đơn hàng:</strong> {{ ucfirst($order->status) }}</p>

        @if($order->refundCompleted)
            <button class="btn btn-secondary" disabled>Đã hoàn tiền</button>
        @else
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#refundModal">
                Hoàn tiền
            </button>
        @endif

        <h3 class="mt-4">Sản phẩm trong đơn hàng</h3>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Tổng</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($order->orderDetails as $item)
                    <tr>
                        <td>{{ $item->product->name ?? 'Sản phẩm không tồn tại' }}</td>
                        <td>{{ $item->quantity }}</td>
                        <td>{{ number_format($item->price ?? 0, 0, ',', '.') }} VNĐ</td>
                        <td>{{ number_format(($item->price ?? 0) * $item->quantity, 0, ',', '.') }} VNĐ</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Refund Modal -->
    <div class="modal fade" id="refundModal" tabindex="-1" aria-labelledby="refundModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="refundModalLabel">Xác nhận hoàn tiền</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="{{ route('orders.refund', $order->id) }}" method="POST">
                    @csrf
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="refundReason" class="form-label">Lý do hoàn tiền</label>
                            <textarea class="form-control" id="refundReason" name="refund_reason" rows="3" required></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="submit" class="btn btn-danger">Xác nhận hoàn tiền</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
