@extends('admin.layout.app')
@section('css')
  <style>
    .highlight {
    background: yellow;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    text-align: center;
    }

    .highlight1 {
    background: rgb(137, 99, 214);
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    text-align: center;
    }

    .highlight2 {
    background: rgb(12, 213, 36);
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    text-align: center;
    }

    .card-body h3 {
    font-weight: bold;
    }

    .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .chart-widget-top {
    padding: 15px;
    }
  </style>
@endsection
@section('main')
  <div class="page-body">
    <div class="container-fluid">
    <div class="page-title">
      <div class="row">
      <div class="col-sm-6 col-12">
        <h2>Thống kê</h2>
      </div>

      </div>
    </div>
    </div>

    <div class="container-fluid">
    <div class="row">
      <div class="col-xl-4 col-md-12 box-col-12">
      <div class="card overflow-hidden">
        <div class="chart-widget-top highlight">
        <h3 class="mb-2">Tổng số đơn hàng</h3>
        <h3 id="countOrder">$3654.00</h3>
        </div>
        <div id="chart-widget1"></div>
      </div>
      </div>

      <div class="col-xl-4 col-md-12 box-col-12">
      <div class="card overflow-hidden">
        <div class="chart-widget-top highlight1">
        <h3 class="mb-2">Tổng doanh thu</h3>
        <h3 id="totalsum">93M</h3>
        </div>
        <div id="chart-widget3">
        <div class="flot-chart-placeholder" id="chart-widget-top-third"></div>
        </div>
      </div>
      </div>

      <div class="col-xl-4 col-md-12 box-col-12">
      <div class="card overflow-hidden">
        <div class="chart-widget-top highlight2">
        <h3 class="mb-2">Số lượng khách hàng</h3>
        <h3 id="countCustomer">93M</h3>
        </div>
        <div id="chart-widget3">
        <div class="flot-chart-placeholder" id="chart-widget-top-third"></div>
        </div>
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
    <section>
    <div class="section__content section__content--p30">
      <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12">
        <!-- RECENT REPORT 2-->
        <div class="recent-report2">
          <h3 class="title-3">Biểu đồ doanh thu</h3>
          <div class="chart-info">
          <div class="date-filter">

          </div>
          </div>
          <div class="recent-report__chart">
          <canvas id="revenueChart" width="400" height="200"></canvas>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 ">
          <div class="recent-report2">
            <h3 class="title-3">Biểu đồ Đơn hàng</h3>
            <div class="recent-report__chart">
            <canvas id="orderChart" width="400" height="200"></canvas>
            </div>

          </div>
          </div>
          <div class="col-lg-4 ">
          <div class="recent-report2">
            <h3 class="title-3" style="font-size: 22px">Trạng thái đơn hàng</h3>
            <div class="recent-report__chart">
            <canvas id="orderStatusPieChart" width="400" height="400"></canvas>
            </div>
          </div>

          </div>
        </div>
        {{-- <div class="recent-report2">
          <div class="recent-report__chart">
          <h3 class="title-3">Top sản phẩm bán chạy nhất trong tháng</h3>
          <div class="recent-report__chart">
            <canvas id="mostOrderedProductChart" width="400" height="200"></canvas>
          </div>
          </div>
        </div> --}}
        </div>
      </div>
      <!-- END RECENT REPORT 2 -->
      </div>
    </div>
    </section>


  @endsection
  @section('js')
  {{-- <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> --}}
    <script src="{{asset('dashbroad-chart.js')}}"></script>
    <script src="{{asset('Static-chart.js')}}"></script>
    <script src="{{asset('product-chart.js')}}"></script>
    <script src="{{asset('revenueChart.js')}}"></script>

  @endsection