@extends('admin.layout.app')

@section('content')
    <h1>Danh sách người dùng</h1>

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
    {{-- {{ url('users/' . $user->id) }} --}}

    <a href="{{ route('users.create') }}" class="btn btn-primary mb-3">Thêm Người Dùng</a>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Ảnh</th>
                <th>Thao tác</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->phone_number }}</td>
                    <td>{{ $user->role }}</td>
                    <td>
                        @if ($user->user_image)
                            <img src="{{ asset('storage/' . $user->user_image) }}" width="50" height="50">
                        @else
                            Không có ảnh
                        @endif
                    </td>

                    <td>
                        <a href="{{ route('users.edit', $user->id) }}" class="btn btn-warning">Sửa</a>
                        <form action="{{ route('users.destroy', $user->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger" onclick="return confirm('Bạn có chắc muốn xóa?')">Xóa</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
