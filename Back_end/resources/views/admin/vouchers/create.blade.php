@extends('admin.index')
@section('main')
    <div class="container">
        <div class="row">
            <div class="">
                <div class="card-body">
                    <h2 class="mb-3">Thêm Voucher</h2>
                    <div class="card-wrapper border rounded-3">
                        <form class="row" action="{{ route('vouchers.store') }}" method="POST">

                            @csrf
                            <div class="mb-3">
                                <label class="form-label">Loại giảm giá</label>
                                <input class="form-control" type="text" id="code" name="code" placeholder="Nhập mã">
                                @error('code')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Code</label>
                                <select class="form-control" id="discount_type" name="discount_type">
                                    <option value="percent">Giảm %</option>
                                    <option value="fixed">Giảm tiền</option>
                                </select>
                                {{-- @error('name')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror --}}
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Giá trị giảm</label>
                                <input class="form-control" type="number" name="discount_value" placeholder="Nhập giá trị">
                                {{-- @error('name')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror --}}
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Đơn hàng tối thiểu</label>
                                <input class="form-control" type="number" name="min_order_value" placeholder="Nhập mã">
                                {{-- @error('name')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror --}}
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Giảm tối đa</label>
                                <input class="form-control" type="number" id="max_discount" name="max_discount" placeholder="Giảm tối đa">
                                {{-- @error('name')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror --}}
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Code</label>
                                <input class="form-control" type="number" name="quantity" placeholder="Nhập mã">
                                {{-- @error('name')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror --}}
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Code</label>
                                <input class="form-control" type="date" name="start_date" placeholder="gày bắt đầu">
                                {{-- @error('name')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror --}}
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Code</label>
                                <input class="form-control" type="date" name="end_date" placeholder="Ngày kết thúc">
                                {{-- @error('name')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror --}}
                            </div>

                            <div class="row">
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
