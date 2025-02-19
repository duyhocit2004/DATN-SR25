@extends('admin.index')

@section('main')
<div class="container">
    <div class="row">
        <div class="">
            <div class="card-body basic-form">
                <div class="card-wrapper border rounded-3">
                    <form class="row" action="{{route('sizes.update', $size->id)}}" method="POST">
                        @csrf
                        @method('PUT')

                        <div class="mb-3">
                            <label class="form-label">Tên Kích Thước</label>
                            <input class="form-control" type="text" name="name" value="{{ old('name', $size->name) }}" placeholder="Nhập kích thước...">
                            @error('name')
                                <p class="alert alert-danger">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="row">
                            <div class="col"></div>
                            <div class="text-end">
                                <button class="btn btn-primary me-2 btn-square" type="submit">Cập Nhật</button>
                                <input class="btn btn-danger btn-square" type="reset" value="Hủy">
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
