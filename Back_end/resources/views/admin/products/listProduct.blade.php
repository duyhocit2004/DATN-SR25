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
                    <a href="{{ route('createProduct') }}" class="btn btn-success mb-3 shadow-sm" style="font-weight: 500; transition: background-color 0.3s, color 0.3s;">
                        Thêm Sản Phẩm Mới
                    </a>
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Ảnh</th>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Số lượng trong kho</th>
                                        <th scope="col">Giá sản phẩm</th>
                                        <th scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($list as $index => $as)
<<<<<<< HEAD
                                        <tr class="border-bottom-success">
                                            <th scope="row">{{ $index + 1}}</th>
                                            <td ư><img class="img-fluid" src="{{$as->image }}  "
                                                    alt="profile" style="width: 240px; Height: auto;"></td>
<<<<<<< HEAD
=======
=======
                                            <th scope="row">{{ $as->id }}</th>
                                            <td><img class="img-30 me-2" src="{{ Storage::url($as->image) }}"
                                                    alt="profile"></td>
>>>>>>> namnguyen
=======
                                        <tr>
                                            <th scope="row">{{ $as->id }}</th>
                                            <td><img class="img-fluid" src="{{ Storage::url($as->image) }}" alt="profile"
                                                    style="max-width: 50px; max-height: 50px;"></td>
>>>>>>> namnguyen
>>>>>>> 244196b624d0f0f5c7dac06fe5687efc2d2f0713
                                            <td>{{ $as->name_product }}</td>
                                            <td>{{ $as->base_stock }}</td>
                                            <td>{{ number_format($as->price_regular, 0, '.', ',') }} VND</td>
                                            <td>
<<<<<<< HEAD
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

=======
                                                <a href="{{ route('get.Product', $as->id) }}" class="btn btn-warning"><i
                                                        class="fas fa-wrench"></i></a>
                                                <form action="{{ route('delete.Product', $as->id) }}" method="POST"
                                                    style="display:inline;">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button class="btn btn-danger"><i class="fas fa-trash"></i></button>
                                                </form>
>>>>>>> namnguyen
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
