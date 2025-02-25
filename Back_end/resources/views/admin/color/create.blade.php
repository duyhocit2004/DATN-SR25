@extends('admin.index')
@section('main')
<div class="container">
    <div class="row">
        <div class="">
            <h2 class="mt-3">Thêm Màu</h2>
            <div class="card-body basic-form">
              <div class="card-wrapper border rounded-3">
                <form class="row" action="{{route('postcolor')}}" method="POST">
                    @csrf
                  <div class="mb-3">
                    <label class="form-label">Tên màu</label>
                    <input class="form-control" id="" type="text" name="name" value="{{old('namecolor')}}" placeholder="Nhập màu...">
                    @error('namecolor')
                        <p class="alert alert-danger">{{$message}}</p>
                    @enderror
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
