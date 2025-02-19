@extends('admin.index')
@section('main')
<div class="container">
    <div class="row">
        <div class="">
            <div class="card-body basic-form">
              <div class="card-wrapper border rounded-3">
                <form class="row" action="{{route('updatecolor',$list->id)}}" method="POST">
                    @csrf
                    @method('PUT')
                  <div class="mb-3">
                    <label class="form-label">Tên màu</label>
                    <input class="form-control" id="" type="text" name="name" value="{{old('namecolor',$list->name)}}" placeholder="Nhập màu....">
                    @error('namecolor')
                        <p class="alert alert-danger">{{$message}}</p>
                    @enderror
                  </div>
                  <div class="row">
                    <div class="col"></div>
                    <div class="text-end">
                      <button class="btn btn-primary" type="submit">Submit</button>
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
