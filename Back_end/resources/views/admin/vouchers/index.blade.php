@extends('admin.index')

@section('main')
    <div class="page-body">
        <div class="container-fluid">
            <div class="page-title">
                <div class="row">
                    <div class="col-sm-6 col-12">
                        <h2>Quản Lý Mã Giảm Giá</h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="table-responsive">
                            <a href="{{ route('vouchers.create') }}" class="btn btn-primary m-3">Thêm Voucher Mới</a>

                            @if (session('success'))
                                <div class="alert alert-success">{{ session('success') }}</div>
                            @endif

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Mã</th>
                                        <th>Loại giảm</th>
                                        <th>Giá trị</th>
                                        <th>Đơn tối thiểu</th>
                                        <th>Giảm tối đa</th>
                                        <th>Số lượng</th>
                                        <th>Đã dùng</th>
                                        <th>User</th>
                                        <th>Bắt đầu</th>
                                        <th>Kết thúc</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($voucher as $voucher)
                                        <tr>
                                            <td>{{ $voucher->code }}</td>
                                            <td>{{ $voucher->discount_type == 'percent' ? 'Giảm %' : 'Giảm tiền' }}</td>
                                            <td>{{ $voucher->discount_value }}{{ $voucher->discount_type == 'percent' ? '%' : ' VNĐ' }}
                                            </td>
                                            <td>{{ number_format($voucher->min_order_value) }} VNĐ</td>
                                            <td>{{ $voucher->max_discount ? number_format($voucher->max_discount) . ' VNĐ' : '-' }}
                                            </td>
                                            <td>{{ $voucher->quantity }}</td>
                                            <td>{{ $voucher->used }}</td>
                                            {{-- <td>{{ $voucher->user_id ? $voucher->user->name : 'Tất cả' }}</td> --}}
                                            <td>{{ $voucher->start_date }}</td>
                                            <td>{{ $voucher->end_date }}</td>
                                            <td>
                                                <span
                                                    class="badge {{ $voucher->status == 'active' ? 'bg-success' : 'bg-secondary' }}">
                                                    {{ ucfirst($voucher->status) }}
                                                </span>
                                            </td>
                                            <td>
                                                <a href="{{ route('vouchers.edit', $voucher->id) }}" class="btn btn-warning btn-sm">Sửa</a>
                                                <form action="{{ route('vouchers.destroy', $voucher->id) }}"
                                                    method="POST" style="display:inline-block;">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-danger btn-sm"
                                                        onclick="return confirm('Xác nhận xóa?');">Xóa</button>
                                                </form>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
