@extends('admin.layout.app')

@section('content')
    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
    {{-- {{ url('users/' . $user->id) }} --}}

    <div class="page-body">
        <div class="container-fluid">
            <div class="page-title">
                <div class="row">
                    <div class="col-sm-6 col-12">
                        <h2>Danh Sách Bình Luận</h2>
                    </div>
                </div>
            </div>
        </div>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <a href="{{ route('comments.create') }}" class="btn btn-success mb-3 shadow-sm"
                style="font-weight: 500; transition: background-color 0.3s, color 0.3s;">
                Thêm bình luận
            </a>

            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và tên</th>
                                        <th>Sản phẩm</th>
                                        <th>Bình luận</th>
                                        <th>Đánh giá</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($list as $key => $comment)
                                        <tr>
                                            <td>{{ $key + 1 }}</td>
                                            <td>{{ $comment->user->name}}</td>
                                            <td>{{ $comment->product->name_product}}</td>
                                            <td>{{ $comment->content }}</td>
                                            <td>
                                                <div class="d-flex">
                                                    <div class="ms-2">
                                                        @for ($i = 1; $i <= 5; $i++)
                                                            @if ($i <= $comment->rating)
                                                                <i class="fas fa-star text-warning"></i>
                                                            @endif
                                                        @endfor
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <a href="{{ route('comments.edit', $comment->id) }}" class="btn btn-warning"><i class="fas fa-wrench"></i></a>
                                                <form action="{{ route('comments.destroy', $comment->id) }}" method="POST"
                                                    style="display:inline;">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-danger"
                                                        onclick="return confirm('Bạn có chắc muốn xóa?')">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
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
