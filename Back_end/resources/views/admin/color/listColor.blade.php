@extends('admin.index')
@section('main')
    <div class="page-body">
        <div class="container-fluid">
            <div class="page-title">
                <div class="row">
                    <div class="col-sm-6 col-12">
                        <h2>Quản Lý Màu Sắc</h2>
                    </div>
                </div>
            </div>
        </div>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <a href="{{ route('createcolor') }}" class="btn btn-success mb-3 shadow-sm" style="font-weight: 500; transition: background-color 0.3s, color 0.3s;">
                        Thêm Màu Mới
                    </a>
                    </style>
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Tên Màu</th>
                                        <th scope="col">Chức Năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($list as $as)
                                        <tr>
                                            <th scope="row">{{ $as->id }}</th>
                                            <td>{{ $as->name }}</td>
                                            <td class="d-flex gap-2">
                                                <a class="btn btn-warning" href="{{ route('getcolor', $as->id) }}"><i class="fas fa-gear"></i></a>
                                                <form action="{{ route('deletecolor', $as->id) }}" method="post" style="display:inline;">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button class="btn btn-danger" onclick="return confirm('Bạn có chắc muốn xóa không?')"><i class="fas fa-trash"></i></button>
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
