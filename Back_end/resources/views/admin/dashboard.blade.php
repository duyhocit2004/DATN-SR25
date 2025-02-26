
@extends('admin.layout.app')
@section('css')
<style>
   .dashboard {
            display: flex;
            gap: 20px;
        }
        .card {
            width: 160px;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            color: white;
            position: relative;
        }
        .sales { background: #a46bf5; }
        .revenue { background: #ff6b81; }
        .expenses { background: #ffb84d; }
        .progress {
            width: 60px;
            height: 60px;
            position: relative;
            margin: auto;
        }
        svg {
            transform: rotate(-90deg);
            position: absolute;
        }
        circle {
            stroke-width: 6;
            fill: none;
            stroke-linecap: round;
        }
        .bg { stroke: #ddd; }
        .fg { stroke: white; }
</style>
@endsection
@section('main')
  <div class="page-body">
    <div class="container-fluid">
        <div class="dashboard">
            <div class="card sales">
                <div class="progress" data-percent="70">
                    <svg width="60" height="60">
                        <circle class="bg" cx="30" cy="30" r="26"></circle>
                        <circle class="fg" cx="30" cy="30" r="26"></circle>
                    </svg>
                </div>
                <h3>$25,970</h3>
                <p>Sales</p>
            </div>
            <div class="card revenue">
                <div class="progress" data-percent="80">
                    <svg width="60" height="60">
                        <circle class="bg" cx="30" cy="30" r="26"></circle>
                        <circle class="fg" cx="30" cy="30" r="26"></circle>
                    </svg>
                </div>
                <h3>$14,270</h3>
                <p>Revenue</p>
            </div>
            <div class="card expenses">
                <div class="progress" data-percent="60">
                    <svg width="60" height="60">
                        <circle class="bg" cx="30" cy="30" r="26"></circle>
                        <circle class="fg" cx="30" cy="30" r="26"></circle>
                    </svg>
                </div>
                <h3>$4,270</h3>
                <p>Expenses</p>
            </div>
        </div>
    </div>
    <!-- Container-fluid starts-->


    
@endsection
@section('js')
<script>
    document.querySelectorAll(".progress").forEach(progress => {
        let percent = progress.getAttribute("data-percent");
        let circumference = 2 * Math.PI * 26;
        let offset = circumference * (1 - percent / 100);
        progress.querySelector(".fg").style.strokeDasharray = circumference;
        progress.querySelector(".fg").style.strokeDashoffset = offset;
        progress.querySelector(".fg").style.transition = "stroke-dashoffset 1s ease-in-out";
    });
</script>
@endsection