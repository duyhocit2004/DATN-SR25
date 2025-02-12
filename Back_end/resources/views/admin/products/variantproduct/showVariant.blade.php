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
                                        <th scope="col">hình</th>
                                        <th scope="col">tên sản phẩm</th>
                                        <th scope="col">số lượng trong kho</th>
                                        <th scope="col">giá sản phẩm</th>
                                        <th scope="col">giá giảm</th>
                                        <th scope="col">thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    @foreach ($list as $as)
                                        <tr class="border-bottom-success">
                                            <th scope="row"></th>
                                            <td><img class="img-30 me-2" src="{{ Storage::url($as->image) }}"
                                                    alt="profile">Ram Jacob</td>
                                            <td>{{ $as->name_product }}</td>
                                            <td>{{ $as->SKU }}</td>
                                            <td>{{ number_format($as->price_regular, 0, '.', ',') }}VND</td>
                                            <td>{{ number_format($as->price_sale, 0, '.', ',') }}</td>
                                            <td>
                                                <div class="my-1">
                                                    <a href="{{ route('variant.create', $as->id) }}"
                                                        class="btn btn-success">thêm biến thể</a>
                                                </div>
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
