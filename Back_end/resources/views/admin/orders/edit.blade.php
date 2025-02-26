@extends('admin.layout.app')

@section('content')
<div class="container">
    <h1 class="my-4">Chỉnh sửa đơn hàng #{{ $order->id }}</h1>

    <form action="{{ route('orders.update', $order->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label class="form-label">Tên khách hàng</label>
            <input type="text" name="customer_name" class="form-control" value="{{ $order->customer_name }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Email khách hàng</label>
            <input type="email" name="customer_email" class="form-control" value="{{ $order->customer_email }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Địa chỉ</label>
            <textarea name="customer_address" class="form-control" required>{{ $order->customer_address }}</textarea>
        </div>

        <div class="mb-3">
            <label class="form-label">Trạng thái</label>
            <select name="status" class="form-select">
                <option value="pending" {{ $order->status == 'pending' ? 'selected' : '' }}>Chờ xử lý</option>
                <option value="completed" {{ $order->status == 'completed' ? 'selected' : '' }}>Hoàn thành</option>
                <option value="cancelled" {{ $order->status == 'cancelled' ? 'selected' : '' }}>Đã hủy</option>
            </select>
        </div>

        <button type="submit" class="btn btn-primary">Cập nhật</button>
    </form>
</div>
@endsection
