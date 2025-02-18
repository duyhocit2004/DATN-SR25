@extends('admin.index')
@section('main')
    <div class="page-body">
        <div class="container-fluid">
            <div class="page-title">
                <div class="row">
                    <div class="col-sm-6 col-12">
                        <h2>Quản Lý Sản Phẩm</h2>
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
                            <table class="table">

                                <thead>
                                    <tr class="border-bottom-secondary border-top-0">
                                        <th scope="col">STT</th>
                                        <th scope="col">Ảnh</th>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Số lượng trong kho</th>
                                        <th scope="col">Giá sản phẩm</th>
                                        <th scope="col">Giảm giá</th>
                                        <th scope="col">Thao tác</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    @foreach ($list as $as)
                                        <tr class="border-bottom-success">
                                            <th scope="row">{{ $as->id }}</th>
                                            <td><img class="img-30 me-2" src="{{ Storage::url($as->image) }}"
                                                    alt="profile"></td>
                                            <td>{{ $as->name_product }}</td>
                                            <td>{{ $as->SKU }}</td>
                                            <td>{{ number_format($as->price_regular, 0, '.', ',') }}VND</td>
                                            <td>{{ number_format($as->price_sale, 0, '.', ',') }}</td>
                                            <td>
                                                <div class="my-1">
                                                    <a href="{{ route('get.Product', $as->id) }}"
                                                        class="btn btn-success"><i class="fas fa-wrench"></i></a>
                                                </div>
                                                <div class="my-1">
                                                    <form action="{{route('delete.Product',$as->id)}}" method="POST">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button class="btn btn-danger"><i class="fas fa-trash"></i></button>
                                                    </form>
                                                </div>

                                                <form action="{{ route('carts.store') }}" method="POST">
                                                    @csrf
                                                    <input type="hidden" name="product_id" value="{{ $as->id }}">
                                                    <label for="quantity">Số lượng:</label>
                                                    <input type="number" name="quantity" id="quantity" value="1" min="1">
                                                    <button type="submit">Thêm vào giỏ hàng</button>
                                                </form>

                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>

                            </table>
                            {{ $list->links() }}
                        </div>
                    </div>
                </div>
            @endsection
