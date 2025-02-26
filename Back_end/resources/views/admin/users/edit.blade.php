@extends('admin.layout.app')

@section('content')
<div class="container-sm my-2">
    <h1>Chỉnh Sửa Người Dùng</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('users.update', $user->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label for="name">Họ và tên</label>
            <input type="text" class="form-control" id="name" name="name" value="{{ $user->name }}" required>
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" name="email" value="{{ $user->email }}" required>
        </div>

        <div class="form-group">
            <label for="phone_number">Số điện thoại</label>
            <input type="text" class="form-control" id="phone_number" name="phone_number" value="{{ $user->phone_number }}" required>
        </div>

        <div class="form-group">
            <label for="role">Vai trò</label>
            <select class="form-control" id="role" name="role">
                <option value="Khách hàng" {{ $user->role == 'Khách hàng' ? 'selected' : '' }}>Khách hàng</option>
                <option value="Quản lý" {{ $user->role == 'Quản lý' ? 'selected' : '' }}>Quản lý</option>
            </select>
        </div>

        <div class="form-group">
            <label for="user_image">Ảnh đại diện</label>
            <input type="file" class="form-control" id="user_image" name="user_image">
            @if ($user->user_image)
                <img src="{{ $user->user_image}}" width="50" height="50">
            @endif
        </div>

        <button type="submit" class="btn btn-success">Cập Nhật</button>
    </form>
</div>

@endsection
