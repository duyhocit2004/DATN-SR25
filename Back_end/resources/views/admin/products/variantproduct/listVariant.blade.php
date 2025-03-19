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
                    <div class="d-flex justify-content-between align-items-center my-1">
                    <div></div>
                
                        <!-- Ô tìm kiếm -->
                        <form action="{{route('variant.index')}}" style="max-width: 300px; width: 100%;">
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
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr class="border-bottom-secondary border-top-0">
                                        <th>ID</th>
                                        <th>Sản phẩm</th>
                                        <th>Các thuộc tính</th>
                                        <th>Số lượng</th>
                                        <th>Giá biến thể</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    @foreach ($list as $as)
                                   
                                        <tr class="border-bottom-success">
                                            <th scope="row">{{ $as->id }}</th>
                                            <td>{{ $as->products->name_product  }}</td>
                                            <td>
                                                <ul>
                                                    <li><span class="fw-bold">Màu sắc: </span>{{ $as->color->name }}</li>
                                                    <li><span class="fw-bold">Size: </span>{{ $as->size->name }}</li>
                                                </ul>
                                            </td>
                                            <td>{{ $as->quanlity }}</td>
                                            <td>{{ number_format($as->price, 0, '.', ',') }}VND</td>
                                            <td>
                                                <div class="my-1">
                                                    <a href="{{ route('variant.listid', $as->id) }}"
                                                        class="btn btn-success"><i class="fas fa-wrench"></i></a>
                                                </div>
                                                <form action="{{ route('variant.delete', $as->id) }}" method="post">
                                                    @csrf
                                                    @method('DELETE')
                                                    <div class="my-1">
                                                        <button class="btn btn-danger"><i class="fas fa-trash"></i></button>
                                                    </div>
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
            </div>
        </div>
    </div>
@endsection
