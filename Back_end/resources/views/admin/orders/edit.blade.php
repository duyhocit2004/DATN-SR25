@extends('admin.layout.app')

@section('content')
<div class="container">
    <h1 class="my-4">Chỉnh sửa đơn hàng #{{ $order->id }}</h1>

    <form action="{{ route('orders.update', $order->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label class="form-label"><strong>Khách hàng</strong></label>
            <input type="text" name="user_name" class="form-control" value="{{ old('user_name', $order->user_name) }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label"><strong>Email</strong></label>
            <input type="email" name="email" class="form-control" value="{{ old('email', $order->email) }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label"><strong>Địa chỉ</strong></label>
            <textarea name="address" class="form-control" required>{{ old('address', $order->address) }}</textarea>
        </div>

        <div class="mb-3">
            <label class="form-label"><strong>Tổng tiền</strong></label>
            <input type="text" class="form-control" value="{{ number_format($order->total_price, 0, ',', '.') }} VNĐ" disabled>
        </div>

        <div class="mb-3">
            <label class="form-label"><strong>Trạng thái đơn hàng</strong></label>
            <select name="status" class="form-select">
                <option value="pending" {{ old('status', $order->status) == 'pending' ? 'selected' : '' }}>Chờ xử lý</option>
                <option value="completed" {{ old('status', $order->status) == 'completed' ? 'selected' : '' }}>Hoàn thành</option>
                <option value="cancelled" {{ old('status', $order->status) == 'cancelled' ? 'selected' : '' }}>Đã hủy</option>
            </select>
        </div>

        <button type="submit" class="btn btn-primary">Cập nhật</button>
    </form>
</div>
@endsection
