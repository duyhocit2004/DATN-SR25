{{-- <div class="card-body">
  <div class="table-responsive">
    <table class="display" id="basic-1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start date</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tiger Nixon</td>
          <td>System Architect</td>
          <td>Edinburgh</td>
          <td>61</td>
          <td>2011/04/25</td>
          <td>$320,800</td>
          <td>
            <ul class="action">
              <li class="edit"> <a href="#"><i class="icon-pencil-alt"></i></a></li>
              <li class="delete"><a href="#"><i class="icon-trash"></i></a></li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div> --}}
@extends('admin.layout.app')

@section('main')
  <div class="page-body">
    <div class="container-fluid">
    <div class="page-title">
      <div class="row">
      <div class="col-sm-6 col-12">
        <h2>Quản Lý Voucher</h2>
      </div>
      </div>
    </div>
    </div>
    <!-- Container-fluid starts-->


    <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <div class="card overflow-hidden">
          <div class="table-responsive signal-table">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">tên Voucher</th>
                  <th scope="col">Mã Voucher</th>
                  <th scope="col">Schedule</th>
                  <th scope="col">Status</th>
                  <th scope="col">trạng thái</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                
                <tr>
                  <th class="border-bottom-0" scope="row">5</th>
                  <td class="border-bottom-0 d-flex align-items-center"><i class="bg-light-danger text-danger me-3"><i data-feather="check-circle"></i></i><span class="text-danger">Online</span></td>
                  <td class="border-bottom-0">Astrid: NE Shared managed</td>
                  <td class="border-bottom-0">Medium</td>
                  <td class="border-bottom-0">No Triaged</td>
                  <td class="border-bottom-0">5.33&#x9;&#x9;</td>
                  <td class="border-bottom-0">Diane Okuma</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
@endsection