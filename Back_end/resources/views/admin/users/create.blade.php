@extends('admin.index')
@section('main')
    <div class="container">
        <div class="row">
            <div class="">
                <div class="card-body">
                    <h2 class="mb-3">Thêm Người Dùng <i class="fas fa-user"></i></h2>
                    <div class="card-wrapper border rounded-3">
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
                            <div class="form-group mt-2">
                                <label for="name">Họ và tên</label>
                                <input type="text" class="form-control" id="name" name="name">
                            </div>

                            <div class="form-group mt-2">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" name="email">
                            </div>

                            <div class="form-group mt-2">
                                <label for="phone_number">Số điện thoại</label>
                                <input type="text" class="form-control" id="phone_number" name="phone_number">
                            </div>

                            <div class="form-group mt-2">
                                <label for="role">Vai trò</label>
                                <select class="form-control" id="role" name="role">
                                    <option value="Khách hàng">Khách hàng</option>
                                    <option value="Quản lý">Quản lý</option>
                                </select>
                            </div>

                            <div class="form-group mt-2">
                                <label for="user_image">Ảnh đại diện</label>
                                <input type="file" class="form-control" id="user_image" name="user_image">
                            </div>

                            <div class="form-group mt-2">
                                <label for="password">Mật khẩu</label>
                                <input type="password" class="form-control" id="password" name="password">
                            </div>

                            <div class="row mt-3">
                                <div class="text-end">
                                    <button class="btn btn-success me-2" type="submit">Submit</button>
                                    <input class="btn btn-danger" type="reset" value="Cancel">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
