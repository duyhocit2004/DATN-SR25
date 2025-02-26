@extends('admin.index')
@section('css')

@endsection
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
                    <div class="container" style="padding : 0px ; margin:0px ; box-sizing: border-box" >
                        <div class="d-flex justify-content-between align-items-center my-1">
                            <!-- Nút Thêm Sản Phẩm -->
                            <a href="{{ route('createProduct') }}" class="btn btn-success shadow-sm" 
                                style="font-weight: 500; transition: background-color 0.3s, color 0.3s;">
                                Thêm Sản Phẩm Mới
                            </a>
                    
                            <!-- Ô tìm kiếm -->
                            <form action="{{route('product')}}" style="max-width: 300px; width: 100%;">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Tìm kiếm sản phẩm..." name="search">
                                    <div class="input-group-append">
                                        <button class="btn" type="submit">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                   
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table ">
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
                                        <tr class="">
                                            <th scope="row">{{ $index + 1}}</th>
                                            <td><img class="img-fluid" src="{{$as->image }}  "
                                                    alt="profile" style="width: 240px;"></td>


                                            <td>{{ $as->name_product }}</td>
                                            <td>{{ $as->base_stock }}</td>
                                            <td>{{ number_format($as->price_regular, 0, '.', ',') }} VND</td>
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
