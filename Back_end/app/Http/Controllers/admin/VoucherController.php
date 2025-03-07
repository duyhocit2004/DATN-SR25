<?php

namespace App\Http\Controllers\admin;

use App\Models\Voucher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

class VoucherController extends Controller
{
    /**
     * Hiển thị danh sách voucher.
     */
    public function index()
    {
        $vouchers = Voucher::all();
        return view('admin.voucher.listVoucher', compact('vouchers'));
    }

    /**
     * Hiển thị form tạo mới voucher.
     */
    public function create()
    {
        return view('admin.voucher.create');
    }

    /**
     * Xử lý thêm mới voucher.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:vouchers,code',
            'discount_type' => ['required', Rule::in(['percent', 'fixed'])],
            'discount_value' => 'required|numeric|min:0',
            'min_order_value' => 'nullable|numeric|min:0',
            'max_discount' => 'nullable|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $voucher = Voucher::create($validated);
        $this->updateVoucherStatus($voucher);

        return redirect()->route('vouchers.index')->with('success', 'Thêm thành công');
    }

    /**
     * Hiển thị form chỉnh sửa voucher.
     */
    public function edit(string $id)
    {
        $voucher = Voucher::findOrFail($id);
        return view('admin.voucher.edit', compact('voucher'));
    }

    /**
     * Cập nhật voucher.
     */
    public function update(Request $request, string $id)
    {
        $voucher = Voucher::findOrFail($id);

        $validated = $request->validate([
            'code' => ['required', 'string', 'max:255', Rule::unique('vouchers')->ignore($id)],
            'discount_type' => ['nullable', Rule::in(['percent', 'fixed'])],
            'discount_value' => 'nullable|numeric|min:0',
            'min_order_value' => 'nullable|numeric|min:0',
            'max_discount' => 'nullable|numeric|min:0',
            'quantity' => 'nullable|integer|min:1',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $voucher->update($validated);
        $this->updateVoucherStatus($voucher);

        return redirect()->route('vouchers.index')->with('success', 'Sửa thành công');
    }

    /**
     * Xóa voucher.
     */
    public function destroy(string $id)
    {
        $voucher = Voucher::findOrFail($id);
        $voucher->delete();
        return redirect()->route('vouchers.index')->with('success', 'Xóa thành công');
    }

    /**
     * Cập nhật trạng thái voucher.
     */
    private function updateVoucherStatus(Voucher $voucher)
    {
        $now = Carbon::now();
        if ($now->gt($voucher->end_date)) {
            $voucher->update(['status' => 'expired']);
        } elseif ($voucher->used >= $voucher->quantity) {
            $voucher->update(['status' => 'used_up']);
        } else {
            $voucher->update(['status' => 'active']);
        }
    }
}
