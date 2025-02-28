@extends('admin.index')

@section('main')
    <div class="page-body">
        <div class="container-fluid">
            <div class="page-title">
                <div class="row">
                    <div class="col-sm-6 col-12">
                        <h2>Quản Lý Giỏ Hàng</h2>
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
                            @if (session('success'))
                                <div class="alert alert-success">{{ session('success') }}</div>
                            @endif
                            <table class="table table-bodered">
                                <thead>
                                    <tr>
                                        <td>Ảnh</td>
                                        <th>Sản phẩm</th>
                                        <th>Giá sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Tổng</th>
                                        <th>Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($carts as $item)
                                        <tr>
                                            <td><img src="{{ $item->product->image }}" alt="Alt"></td>
                                            <td>{{ $item->product->name_product }}</td>
                                            <td>
                                                <span
                                                    class="text-decoration-line-through opacity-50">{{ number_format($item->product->price_regular) }}đ
                                                </span>
                                                {{ number_format($item->product->price_sale) }}đ
                                            </td>
                                            <td>{{ $item->quantity }}</td>
                                            <td>{{ number_format($item->sub_total, 3) }} VNĐ</td>
                                            <td>
                                                <form action="{{ route('carts.destroy', $item->id) }}" method="POST">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-danger">Xóa</button>
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
