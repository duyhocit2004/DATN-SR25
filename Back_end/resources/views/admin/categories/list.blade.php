@extends('admin.index')
@section('main')
    <div class="page-body">
        <div class="container-fluid">
            <div class="page-title">
                <div class="row">
                    <div class="col-sm-6 col-12">
                        <h2>Quản Lý Danh Mục</h2>
                    </div>
                </div>
            </div>
        </div>
        <!-- Container-fluid starts-->
        <div class="container-fluid">

            <a class="btn btn-success mb-4" href="{{ route('categories.create') }}">Thêm danh mục</a>

            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead class="table-dark">
                                    <tr class="">
                                        <th scope="col">STT</th>
                                        <th scope="col">Tên danh mục</th>
                                        <th scope="col">Chức năng</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    @foreach ($listCategory as $category)
                                        <tr class="">
                                            <td>{{ $category->id }}</td>
                                            <td>{{ $category->name }}</td>
                                            <td class="d-flex gap-2">
                                                <a class="btn btn-warning"
                                                    href="{{ route('categories.edit', $category->id) }}">Sửa</a>
                                                <form action="{{ route('categories.destroy', $category->id) }}" method="post">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button class="btn btn-danger"
                                                        onclick="return confirm('Bạn có chắc chắn muốn xóa danh mục này không?')">Xóa</button>
                                                </form>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
                {{$listCategory->links()}}
            </div>
        </div>
    </div>
@endsection
