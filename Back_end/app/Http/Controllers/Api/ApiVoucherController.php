<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Illuminate\Http\Request;

class ApiVoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Voucher::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'code' => 'required|string|max:255',
        ]);

        $voucher = Voucher::create([
            'code' => $request->code,
            'discount_type' => $request->discount_type,
            'discount_value' => $request->discount_value,
            'min_order_value' => $request->min_order_value,
            'max_discount' => $request->max_discount,
            'quantity' => $request->quantity,
            'used' => $request->used,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return response()->json(['message' => 'Thêm voucher thành công', 'voucher' => $voucher], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $voucher = Voucher::query()->findOrFail($id);

        return response()->json(['data' => $voucher], 200);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $voucher = Voucher::query()->findOrFail($id);

        $params = $request->all();

        $request->validate([
            'code' => 'required|string|max:255',
        ]);

        $voucher->update($params);

        return response()->json(['message' => 'Cập nhật voucher thành công', 'voucher' => $voucher], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $voucher = Voucher::query()->findOrFail($id);

        $voucher->delete();

        return response()->json(['message' => 'Xóa voucher thành công'], 200);

    }
}
