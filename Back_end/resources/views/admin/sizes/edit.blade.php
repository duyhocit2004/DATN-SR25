@extends('admin.index')

@section('main')
<div class="container">
    <div class="row">
        <div class="">
            <div class="card-body basic-form">
                <h2 class="mb-3">Sửa Size</h2>
                <div class="card-wrapper border rounded-3">
                    <form class="row" action="{{route('sizes.update', $size->id)}}" method="POST">
                        @csrf
                        @method('PUT')

                        <div class="mb-3">
                            <label class="form-label">Tên Size</label>
                            <input class="form-control" type="text" name="name" value="{{ old('name', $size->name) }}" placeholder="Nhập kích thước...">
                            @error('name')
                                <p class="alert alert-danger">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="row">
                            <div class="col"></div>
                            <div class="text-end">
                                <button class="btn btn-success me-2" type="submit">Submit</button>
                                <input class="btn btn-danger" type="reset" value="Hủy">
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
