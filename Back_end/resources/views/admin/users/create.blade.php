@extends('admin.layout.app')

@section('content')
    <h1>Thêm Người Dùng</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('users.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="form-group">
            <label for="name">Họ và tên</label>
            <input type="text" class="form-control" id="name" name="name" required>
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>

        <div class="form-group">
            <label for="phone_number">Số điện thoại</label>
            <input type="text" class="form-control" id="phone_number" name="phone_number" required>
        </div>

        <div class="form-group">
            <label for="role">Vai trò</label>
            <select class="form-control" id="role" name="role">
                <option value="Khách hàng">Khách hàng</option>
                <option value="Quản lý">Quản lý</option>
            </select>
        </div>

        <div class="form-group">
            <label for="user_image">Ảnh đại diện</label>
            <input type="file" class="form-control" id="user_image" name="user_image">
        </div>

        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <input type="password" class="form-control" id="password" name="password" required>
        </div>

        <button type="submit" class="btn btn-primary">Lưu</button>
    </form>
@endsection
