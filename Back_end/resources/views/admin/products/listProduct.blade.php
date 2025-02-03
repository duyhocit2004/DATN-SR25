@extends('admin.index')
@section('main')
<div class="page-body">
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-sm-6 col-12"> 
            <h2>Quản Lý Sản Phẩm</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <?php 
    var_dump($list)
    ?>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="table-responsive">
              <table class="table">
                 <thead>
                  <tr class="border-bottom-secondary border-top-0">
                    <th scope="col">STT</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Company</th>
                    <th scope="col">Language</th>
                    <th scope="col">chức năngnăng</th>
                   </tr>
                 </thead>
                <tbody>
                  
                  @foreach ( $list as  $as )
                  <tr class="border-bottom-success">
                    <th scope="row"></th>
                    <td><img class="img-30 me-2" src="../assets/images/avtar/3.jpg" alt="profile">Ram Jacob</td>
                    <td>{{$as->name_product}}</td>
                    <td>{{$as->SKU}}</td>
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