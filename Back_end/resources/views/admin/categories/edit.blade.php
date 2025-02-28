@extends('admin.index')
@section('main')
    <div class="container">
        <div class="row">
            <div class="">
                <div class="card-body basic-form">
                    <h2 class="mb-3">Thêm danh mục</h2>
                    <div class="card-wrapper border rounded-3">
                        <form class="row" action="{{ route('categories.update', $category->id) }}" method="POST">

                            @csrf
                            @method('PUT')
                            <div class="mb-3">
                                <label class="form-label">Tên danh mục</label>
                                <input class="form-control" type="text" name="name" value="{{ $category->name }}"
                                    placeholder="Nhập màu">
                                @error('name')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Type</label>
                                <select class="form-control" name="type">
                                    <option value="Nữ" {{ $category->type == 'Nữ' ? 'selected' : '' }}>Nữ</option>
                                    <option value="Nam" {{ $category->type == 'Nam' ? 'selected' : '' }}>Nam</option>
                                </select>
                                {{-- @error('name')
                                    <p class="alert alert-danger">{{ $message }}</p>
                                @enderror --}}
                            </div>

                            <div class="row">
                                <div class="col"></div>
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
