
@extends('admin.layout.app')
@section('css')
<style>
  .type-t {
      border: 1px solid #FF00FF;
      border-radius:100px; 
      color: #FF00FF;
      width: 100%;
      padding: 0px 5px;
      background-color: #FFF0F5; 
  }
  .type-f {
      border: 1px solid #1E90FF;
      border-radius:100px; 
      color: #1E90FF;
      width: 100%;
      padding: 0px 5px;
      background-color: #F0FFFF; 
  }
  .type-s {
      border: 1px solid #28a745;
      border-radius:100px; 
      color: #28a745;
      width: 100%;
      padding: 0px 5px;
      background-color: #F0FFF0; 
  }
</style>
@endsection
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
                  <th scope="col">Mã Voucher</th>
                  <th scope="col">loại giảm giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Thời gian</th>
                  <th scope="col">trạng thái</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                @foreach ( $voucher as $index => $Vouchers)
                <tr>
                  <th class="border-bottom-0" scope="row">{{$index + 1}}</th>
                  <td class="border-bottom-0">{{$Vouchers->code}}</td>
                  <td>{{ $Vouchers->discount_type == 'percent' ? 'Giảm %' : 'Giảm tiền' }}</td>
                  <td class="border-bottom-0">{{$Vouchers->quantity}} </td>
                  <td class="border-bottom-0">
                    <p>Bắt đầu :{{date('d/m/Y', strtotime($Vouchers->start_date))}} </p>
                    <p>Kết thúc:{{date('d/m/Y', strtotime($Vouchers->end_date))}}</p>
                  </td>
                  <td class="border-bottom-0">
                    @if (date('d/m/Y') < date('d/m/Y', strtotime($Vouchers->start_date)))
                      <div class="type-s">
                          Chưa diễn ra
                      </div>
                   @elseif ($Vouchers->date_start <= date('d/m/Y') && $Vouchers->date_end >= date('d/m/Y'))
                      <div class="type-s">
                          Đang diễn ra
                      </div>
                   @else
                       <div class="type-s" style="border: 1px solid #a72828 !important;color: #a72828 !important;background-color: #fff0f0 !important;">
                       Đã kết thúc
                       </div>
                  @endif
                  </td>
                  <td class="border-bottom-0">
                    <a href="{{ route('vouchers.edit', $Vouchers->id) }}"
                      class="btn btn-warning">Sửa</a>
                  <form action="{{ route('vouchers.destroy', $Vouchers->id) }}" method="POST"
                      style="display:inline;">
                      @csrf
                      @method('DELETE')
                      <button type="submit" class="btn btn-danger"
                          onclick="return confirm('Bạn có chắc muốn xóa?')">Xóa</button>
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
@endsection