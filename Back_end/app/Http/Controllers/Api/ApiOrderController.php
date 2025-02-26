<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Models\Shipper;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ApiOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      
        $orders = Order::latest()->paginate(10);
        return response()->json(['success' => true, 'data' => $orders], 200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
=
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'order_code' => 'required|unique:orders,order_code',
            'shipping_fee' => 'nullable|numeric',
            'shipper_id' => 'nullable|exists:shippers,id',
            'voucher_id' => 'nullable|exists:vouchers,id',
            'total_price' => 'required|numeric|min:0',
            'phone_number' => 'required|string|max:15',
            'email' => 'required|email',
            'address' => 'required|string|max:255',
            'note' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        try {
            $user = User::findOrFail($request->user_id);

            $order = Order::create([
                'slug' => 'order-' . uniqid(),
                'user_id' => $user->id,
                'order_code' => $request->order_code,
                'shipping_fee' => $request->shipping_fee ?? 0,
                'shipper_id' => $request->shipper_id,
                'voucher_id' => $request->voucher_id,
                'date' => now(),
                'user_name' => $user->name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'total_price' => $request->total_price,
                'address' => $request->address,
                'note' => $request->note,
            ]);

            DB::commit();
            return response()->json(['success' => true, 'data' => $order], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'Lỗi khi tạo đơn hàng.', 'error' => $e->getMessage()], 500);
        }

    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with('orderDetails.product')->find($id);
        if (!$order) {
            return response()->json(['success' => false, 'message' => 'Đơn hàng không tồn tại.'], 404);
        }
        return response()->json(['success' => true, 'data' => $order], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['success' => false, 'message' => 'Đơn hàng không tồn tại.'], 404);
        }

        $validate = Validator::make($request->all(), [
            'user_id' => 'sometimes|required|exists:users,id',
            'order_code' => 'sometimes|required|unique:orders,order_code,' . ($order->id ?? 'NULL'),
            'shipping_fee' => 'nullable|numeric|min:0',
            'shipper_id' => 'nullable|exists:shippers,id',
            'voucher_id' => 'nullable|exists:vouchers,id',
            'total_price' => 'sometimes|required|numeric|min:0',
            'phone_number' => 'sometimes|required|string|max:15',
            'email' => 'sometimes|required|email',
            'address' => 'sometimes|required|string|max:255',
            'note' => 'nullable|string|max:255',
        ], [
            'user_id.required' => 'Bạn chưa chọn khách hàng.',
            'user_id.exists' => 'Khách hàng không hợp lệ.',
            'order_code.required' => 'Mã đơn hàng là bắt buộc.',
            'order_code.unique' => 'Mã đơn hàng đã tồn tại.',
            'shipping_fee.numeric' => 'Phí vận chuyển phải là số.',
            'shipping_fee.min' => 'Phí vận chuyển không thể âm.',
            'shipper_id.exists' => 'Shipper không hợp lệ.',
            'voucher_id.exists' => 'Voucher không hợp lệ.',
            'total_price.required' => 'Tổng giá trị đơn hàng là bắt buộc.',
            'total_price.numeric' => 'Tổng giá trị phải là số.',
            'total_price.min' => 'Tổng giá trị không thể âm.',
            'phone_number.required' => 'Bạn chưa nhập số điện thoại.',
            'phone_number.max' => 'Số điện thoại không được quá 15 ký tự.',
            'email.required' => 'Bạn chưa nhập email.',
            'email.email' => 'Email không hợp lệ.',
            'address.required' => 'Bạn chưa nhập địa chỉ.',
            'address.max' => 'Địa chỉ không được quá 255 ký tự.',
            'note.max' => 'Ghi chú không được quá 255 ký tự.',
        ]);

        if ($validate->fails()) {
            return response()->json(['success' => false, 'errors' => $validate->errors()], 422);
        }

        DB::beginTransaction();
        try {
            $user = User::findOrFail($request->user_id);

            $order->update([
                'user_id' => $user->id,
                'order_code' => $request->order_code,
                'shipping_fee' => $request->shipping_fee ?? 0,
                'shipper_id' => $request->shipper_id,
                'voucher_id' => $request->voucher_id,
                'user_name' => $user->name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'total_price' => $request->total_price,
                'address' => $request->address,
                'note' => $request->note,
            ]);

            DB::commit();
            return response()->json(['success' => true, 'data' => $order], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'Lỗi khi cập nhật đơn hàng.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['success' => false, 'message' => 'Đơn hàng không tồn tại.'], 404);
        }

        try {
            $order->delete();
            return response()->json(['success' => true, 'message' => 'Đơn hàng đã được xóa thành công.'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Lỗi khi xóa đơn hàng.', 'error' => $e->getMessage()], 500);
        }
    }
}
