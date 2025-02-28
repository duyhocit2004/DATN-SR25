@extends('admin.index')
@section('main')
    <div class="container">
        <div class="row">
            <div class="">
                <div class="card-body">
                    <h2 class="mb-3">Sửa Voucher</h2>
                    <div class="card-wrapper border rounded-3">
                        <form class="row" action="{{ route('vouchers.update', $voucher->id) }}" method="POST">

                            @csrf
                            @method('PUT')
                            <div class="mb-3">
                                <label class="form-label">Loại giảm giá</label>
                                <input class="form-control" type="text" id="code" name="code" value="{{ $voucher->code }}">
                                @error('code')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Code</label>
                                <select class="form-control" id="discount_type" name="discount_type" value="{{ $voucher->discount_type }}">
                                    <option value="percent">Giảm %</option>
                                    <option value="fixed">Giảm tiền</option>
                                </select>
                                @error('discount_type')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Giá trị giảm</label>
                                <input class="form-control" type="number" name="discount_value" value="{{ $voucher->discount_value }}">
                                @error('discount_value')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Đơn hàng tối thiểu</label>
                                <input class="form-control" type="number" name="min_order_value" value="{{ $voucher->min_order_value }}">
                                @error('min_order_value')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Giảm tối đa</label>
                                <input class="form-control" type="number" id="max_discount" name="max_discount" value="{{ $voucher->max_discount }}">
                                @error('max_discount')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Số lượng</label>
                                <input class="form-control" type="number" name="quantity" value="{{ $voucher->quantity }}">
                                @error('quantity')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Ngày bắt đầu</label>
                                <input class="form-control" type="text" name="start_date" value="{{ $voucher->start_date }}">
                                @error('start_date')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="end_date" class="form-label">Ngày kết thúc: </label>
                                <input class="form-control" type="text" name="end_date" value="{{ $voucher->end_date }}">
                                @error('end_date')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
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
