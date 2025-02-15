@extends('admin.index')
@section('main')
<div class="page-body">
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-sm-6 col-12"> 
            <h2>Quản Lý màu sắc</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="table-responsive">
              <table class="table">
                 <thead>
                  <tr class="border-bottom-secondary border-top-0">
                    <th scope="col">STT</th>
                    <th scope="col">tên màu</th>
                    <th scope="col">chức năng</th>
                   </tr>
                 </thead>
                <tbody>
                  
                  @foreach ( $list as  $as )
                  <tr class="border-bottom-success">
                    <th scope="col">{{$as->id}}</th>
                    <td>{{$as->name}}</td>
                    <td>
                       <a class="btn btn-success" href="{{route('getcolor',$as->id)}}">sửa</a>
                      <form action="{{route('deletecolor',$as->id)}}" method="post">
                        @csrf
                        @method('DELETE')
                        <button class="btn btn-danger">xóa</button>
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