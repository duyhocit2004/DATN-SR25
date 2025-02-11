@extends('admin.index')

@section('main')
<div class="page-body">
    <div class="container-fluid">
        <div class="page-title">
            <div class="row">
                <div class="col-sm-6 col-12">
                    <h2>Quản Lý Kích Thước</h2>
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
                        <a href="{{ route('sizes.create') }}" class="btn btn-primary m-3">Thêm Kích Thước Mới</a>

                        @if (session('success'))
                            <div class="alert alert-success">{{ session('success') }}</div>
                        @endif

                        <table class="table">
                            <thead>
                                <tr class="border-bottom-secondary border-top-0">
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên Kích Thước</th>
                                    <th scope="col">Chức Năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($sizes as $key => $size)
                                    <tr class="border-bottom-success">
                                        <th scope="row">{{ $key + 1 }}</th>
                                        <td>{{ $size->name }}</td>
                                        <td>
                                            <a class="btn btn-success btn-sm" href="{{ route('sizes.edit', $size) }}">Sửa</a>
                                            <form action="{{ route('sizes.destroy', $size) }}" method="post" style="display:inline;">
                                                @csrf
                                                @method('DELETE')
                                                <button class="btn btn-danger btn-sm" onclick="return confirm('Bạn có muốn xóa không?')">Xóa</button>
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
