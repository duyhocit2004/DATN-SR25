<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class ApiVoucherController extends Controller
{
    /**
     * Lấy danh sách tất cả voucher.
     */
    public function index()
    {
        return response()->json(Voucher::all(), 200);
    }

    /**
     * Thêm voucher mới.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:vouchers,code',
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

        return response()->json(['message' => 'Thêm voucher thành công', 'voucher' => $voucher], 201);
    }

    /**
     * Lấy thông tin chi tiết voucher.
     */
    public function show(string $id)
    {
        $voucher = Voucher::find($id);
        if (!$voucher) {
            return response()->json(['message' => 'Voucher không tồn tại'], 404);
        }
        return response()->json(['data' => $voucher], 200);
    }

    /**
     * Cập nhật thông tin voucher.
     */
    public function update(Request $request, string $id)
    {
        $voucher = Voucher::find($id);
        if (!$voucher) {
            return response()->json(['message' => 'Voucher không tồn tại'], 404);
        }

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

        return response()->json(['message' => 'Cập nhật voucher thành công', 'voucher' => $voucher], 200);
    }

    /**
     * Xóa voucher.
     */
    public function destroy(string $id)
    {
        $voucher = Voucher::find($id);
        if (!$voucher) {
            return response()->json(['message' => 'Voucher không tồn tại'], 404);
        }

        $voucher->delete();
        return response()->json(['message' => 'Xóa voucher thành công'], 200);
    }

    /**
     * Cập nhật trạng thái của voucher.
     */
    private function updateVoucherStatus(Voucher $voucher)
    {
        $now = Carbon::now();
        if ($voucher->end_date && $now->gt($voucher->end_date)) {
            $voucher->update(['status' => 'expired']);
        } elseif ($voucher->used >= $voucher->quantity) {
            $voucher->update(['status' => 'used_up']);
        } else {
            $voucher->update(['status' => 'active']);
        }
    }


    public function toggleStatus($id)
    {
        $voucher = Voucher::find($id);
        if (!$voucher) {
            return response()->json(['message' => 'Voucher không tồn tại'], 404);
        }

        // Chuyển đổi trạng thái giữa 'active' và 'disabled'
        $voucher->status = ($voucher->status === 'active') ? 'disabled' : 'active';
        $voucher->save();

        return response()->json(['message' => 'Cập nhật trạng thái thành công', 'voucher' => $voucher], 200);
    }

}
