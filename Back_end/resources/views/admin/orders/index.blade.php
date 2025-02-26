@extends('admin.layout.app')
@section('content')
<div class="container">
    <h2 class="mb-4">Danh Sách Đơn Hàng</h2>
    <a href="{{ route('orders.create') }}" class="btn btn-primary mb-3">Tạo Đơn Hàng</a>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Mã đơn hàng</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Tổng tiền</th>
                <th>Ngày đặt</th>
                <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order)
                <tr>
                    <td>{{ $order->id }}</td>
                    <td>{{ $order->order_code }}</td>
                    <td>{{ $order->user_name }}</td>
                    <td>{{ $order->email }}</td>
                    <td>{{ $order->phone_number }}</td>
                    <td>{{ $order->address }}</td>
                    <td>{{ number_format($order->total_price, 0, ',', '.') }} VND</td>
                    <td>{{ $order->created_at->format('d/m/Y H:i') }}</td>
                    <td>

                        <a href="{{ route('orders.show', $order->id) }}" class="btn btn-info btn-sm">Xem</a>
                        <a href="{{ route('orders.edit', $order->id) }}" class="btn btn-warning btn-sm">Sửa</a>
                        <form action="{{ route('orders.destroy', $order->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Bạn có chắc chắn muốn xóa?')">Xóa</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <!-- Phân trang -->
    <div class="d-flex justify-content-center">
        {{ $orders->links() }}
    </div>
</div>
@endsection
