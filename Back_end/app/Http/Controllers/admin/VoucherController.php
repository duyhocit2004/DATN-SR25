<?php

namespace App\Http\Controllers\admin;

use App\Models\User;
use App\Models\Voucher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $voucher = Voucher::query()->get();
        // dd($voucher);
        return view('admin.voucher.listVoucher', compact('voucher'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.voucher.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required',
            'discount_type' => 'required',
            'discount_value' => 'required',
            'min_order_value' => 'required',
            'max_discount' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        Voucher::create([
            'code' => $request->code,
            'discount_type' => $request->discount_type,
            'discount_value' => $request->discount_value,
            'min_order_value' => $request->min_order_value,
            'max_discount' => $request->max_discount,
            'quantity' => $request->quantity,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return redirect()->route('vouchers.index')
            ->with('success', 'Thêm thành công');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $voucher = Voucher::findOrFail($id);

        return view('admin.vouchers.edit', compact('voucher'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $voucher = Voucher::findOrFail($id);

        $request->validate([
            'code' => 'required',
            'discount_type' => 'required',
            'discount_value' => 'required',
            'min_order_value' => 'required',
            'max_discount' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        $voucher->update([
            'code' => $request->code,
            'discount_type' => $request->discount_type,
            'discount_value' => $request->discount_value,
            'min_order_value' => $request->min_order_value,
            'max_discount' => $request->max_discount,
            'quantity' => $request->quantity,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return redirect()->route('vouchers.index')
            ->with('sucsess', 'Sửa thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $voucher = Voucher::findorFail($id);

        $voucher->delete();

        return redirect()->route('vouchers.index')

            ->with('sucess', 'Xóa thành công');
    }
}
