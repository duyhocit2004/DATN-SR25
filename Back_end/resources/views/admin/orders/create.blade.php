@extends('admin.layout.app')

@section('content')
<div class="container">
    <h2 class="mb-4">Tạo Đơn Hàng Mới</h2>

    @if($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('orders.store') }}" method="POST">
        @csrf

        <div class="form-group">
            <label>Khách hàng:</label>
            <select name="user_id" class="form-control">
                @foreach($users as $user)
                    <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
                        {{ $user->name }} - {{ $user->email }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="form-group">
            <label>Mã đơn hàng:</label>
            <input type="text" name="order_code" class="form-control" value="{{ old('order_code') }}" required>
        </div>

        <div class="form-group">
            <label>Phí vận chuyển:</label>
            <input type="number" name="shipping_fee" class="form-control" value="{{ old('shipping_fee') }}">
        </div>

        <div class="form-group">
            <label>Shipper:</label>
            <select name="shipper_id" class="form-control">
                <option value="">Chọn shipper</option>
                @foreach($shippers as $shipper)
                    <option value="{{ $shipper->id }}" {{ old('shipper_id') == $shipper->id ? 'selected' : '' }}>
                        {{ $shipper->name_shipper }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="form-group">
            <label>Voucher:</label>
            <select name="voucher_id" class="form-control">
                <option value="">Không dùng voucher</option>
                @foreach($vouchers as $voucher)
                    <option value="{{ $voucher->id }}" {{ old('voucher_id') == $voucher->id ? 'selected' : '' }}>
                        {{ $voucher->code }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="form-group">
            <label>Tổng tiền:</label>
            <input type="number" name="total_price" class="form-control" value="{{ old('total_price') }}" required>
        </div>

        <div class="form-group">
            <label>Số điện thoại:</label>
            <input type="text" name="phone_number" class="form-control" value="{{ old('phone_number') }}" required>
        </div>

        <div class="form-group">
            <label>Email:</label>
            <input type="email" name="email" class="form-control" value="{{ old('email') }}" required>
        </div>

        <div class="form-group">
            <label>Địa chỉ:</label>
            <input type="text" name="address" class="form-control" value="{{ old('address') }}" required>
        </div>

        <div class="form-group">
            <label>Ghi chú:</label>
            <textarea name="note" class="form-control">{{ old('note') }}</textarea>
        </div>

        <button type="submit" class="btn btn-success">Lưu đơn hàng</button>
    </form>
</div>
@endsection
