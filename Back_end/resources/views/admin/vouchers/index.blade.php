@extends('admin.index')

@section('main')
    <div class="page-body">
        <div class="container-fluid">
            <div class="page-title">
                <div class="row">
                    <div class="col-sm-6 col-12">
                        <h2>Mã Giảm Giá<i class="fas fa-tickets"></i></h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <a href="{{ route('vouchers.create') }}" class="btn btn-success mb-3 shadow-sm" style="font-weight: 500; transition: background-color 0.3s, color 0.3s;">
                        Thêm Mã Giảm Giá
                    </a>
                    <div class="card">
                        <div class="table-responsive">
                            @if (session('success'))
                                <div class="alert alert-success">{{ session('success') }}</div>
                            @endif

                            <table class="table table-striped table-hover">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Mã</th>
                                        <th>Loại giảm</th>
                                        <th>Giá trị</th>
                                        <th>Đơn tối thiểu</th>
                                        <th>Giảm tối đa</th>
                                        <th>Số lượng</th>
                                        <th>Đã dùng</th>
                                        <th>Bắt đầu</th>
                                        <th>Kết thúc</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($voucher as $item)
                                        <tr>
                                            <td>{{ $item->code }}</td>
                                            <td>{{ $item->discount_type == 'percent' ? 'Giảm %' : 'Giảm tiền' }}</td>
                                            <td>{{ $item->discount_value }} {{ $item->discount_type == 'percent' ? '%' : 'VNĐ' }}</td>
                                            <td>{{ number_format($item->min_order_value) }} VNĐ</td>
                                            <td>{{ $item->max_discount ? number_format($item->max_discount) . ' VNĐ' : '-' }}</td>
                                            <td>{{ $item->quantity }}</td>
                                            <td>{{ $item->used }}</td>
                                            <td>{{ $item->start_date }}</td>
                                            <td>{{ $item->end_date }}</td>
                                            <td>
                                                <span class="badge {{ $item->status == 'active' ? 'bg-success' : 'bg-secondary' }}">
                                                    {{ ucfirst($item->status) }}
                                                </span>
                                            </td>
                                            <td>
                                                <a href="{{ route('vouchers.edit', $item->id) }}" class="btn btn-warning btn-sm"><i class="fas fa-wrench"></i></a>
                                                <form action="{{ route('vouchers.destroy', $item->id) }}" method="POST" style="display:inline-block;">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Xác nhận xóa?');"><i class="fas fa-trash"></i></button>
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
