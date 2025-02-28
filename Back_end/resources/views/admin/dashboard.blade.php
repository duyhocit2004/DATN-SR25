
@extends('admin.layout.app')
@section('css')
<style>
    /* .id{
        width: 300px;
        height: 200px;
    } */
</style>    
@endsection
@section('main')
<div class="page-body">
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-sm-6 col-12"> 
            <h2>Chart</h2>
          </div>
          
        </div>
      </div>
    </div>
    <section>
      <div class="section__content section__content--p30" style="margin-bottom: 16px">
          <div class="date-filter row align-items-center g-3">
              <div class="container-fluid" style="margin-left: 14px">
                  <div class="row">
                      <div class="col">
                          <label for="startDate" class="form-label">Từ ngày:</label>
                          <input type="date" id="startDate" name="start_date" class="form-control">
                      </div>

                      <div class="col">
                          <label for="endDate" class="form-label">Đến ngày:</label>
                          <input type="date" id="endDate" name="end_date" class="form-control">
                      </div>

                      <div class="col d-flex align-items-end" style="max-width: 140px">
                          <button id="updateAllChartsButton" class="btn btn-primary w-100">Kiểm tra</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <!-- Chart widget top Start-->
      <div class="row">
        <div class="col-xl-4 col-md-12 box-col-12">
          <div class="card overflow-hidden">
            <div class="chart-widget-top">
              <div class="row card-body pb-0 m-0">
                <div class="col-xl-9 col-lg-8 col-9 p-0">
                  <h3 class="mb-2">Total Sale</h3>
                  <h3>$3654.00</h3><span>Compare to last month</span>
                </div>
                <div class="col-xl-3 col-lg-4 col-3 text-end p-0">
                  <h6 class="text-success">+65%</h6>
                </div>
              </div>
              <div>
                <div id="chart-widget1"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-12 box-col-12">
          <div class="card overflow-hidden">
            <div class="chart-widget-top">
              <div class="row card-body pb-0 m-0">
                <div class="col-xl-9 col-lg-8 col-9 p-0">
                  <h3 class="mb-2">Total Project</h3>
                  <h3>12569</h3><span>Compare to last month</span>
                </div>
                <div class="col-xl-3 col-lg-4 col-3 text-end p-0">
                  <h6 class="text-success">+65%</h6>
                </div>
              </div>
              <div id="chart-widget2">
                <div class="flot-chart-placeholder" id="chart-widget-top-second"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-12 box-col-12">
          <div class="card overflow-hidden">
            <div class="chart-widget-top">
              <div class="row card-body pb-0 m-0">
                <div class="col-xl-9 col-lg-8 col-9 p-0">
                  <h3 class="mb-2">Total Product</h3>
                  <h3>93M</h3><span>Compare to last month</span>
                </div>
                <div class="col-xl-3 col-lg-4 col-3 text-end p-0">
                  <h6 class="text-success">+65%</h6>
                </div>
              </div>
              <div id="chart-widget3">
                <div class="flot-chart-placeholder" id="chart-widget-top-third"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  <div class="container">
    <canvas id="myChart"></canvas>
</div>
  

@endsection
@section('js')
  <script src="{{asset('dashbroad-chart.js')}}"></script>
  <script src="{{asset('product-chart.js')}}"></script>
@endsection
