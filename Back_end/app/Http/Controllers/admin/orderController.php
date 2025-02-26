<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Models\Shipper;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth'); // Bảo vệ route
    }

    /**
     * Hiển thị danh sách đơn hàng.
     */
    public function index()
    {
        $orders = Order::latest()->paginate(10);
        return view('admin.orders.index', compact('orders'));
    }

    /**
     * Hiển thị form tạo đơn hàng.
     */
    public function create()
    {
        $users = User::all();
        $shippers = Shipper::all();
        $vouchers = Voucher::all();
        return view('admin.orders.create', compact('users', 'shippers', 'vouchers'));
    }

    /**
     * Lưu đơn hàng mới vào database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'order_code' => 'required|unique:orders,order_code',
            'shipping_fee' => 'nullable|numeric',
            'shipper_id' => 'nullable|exists:shippers,id',
            'voucher_id' => 'nullable|exists:vouchers,id',
            'total_price' => 'required|numeric|min:0',
            'phone_number' => 'required',
            'email' => 'required|email',
            'address' => 'required|string|max:255',
            'note' => 'nullable|string|max:255',
        ]);

        DB::beginTransaction();
        try {
            $user = User::findOrFail($request->user_id);

            Order::create([
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
            return redirect()->route('orders.index')->with('success', 'Đơn hàng đã được tạo thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Có lỗi xảy ra khi tạo đơn hàng: ' . $e->getMessage());
        }
    }

    /**
     * Hiển thị chi tiết đơn hàng.
     */
    public function show($id)
    {
        $order = Order::with('orderDetails.product')->findOrFail($id);
        // dd($order->toArray());
        if (!$order) {
            return redirect()->back()->with('error', 'Đơn hàng không tồn tại');
        }
        return view('admin.orders.show', compact('order'));
    }

    /**
     * Hiển thị form chỉnh sửa đơn hàng.
     */
    public function edit($id)
    {
        $order = Order::findOrFail($id);
        $users = User::all();
        $shippers = Shipper::all();
        $vouchers = Voucher::all();
        return view('admin.orders.edit', compact('order', 'users', 'shippers', 'vouchers'));
    }

    /**
     * Cập nhật thông tin đơn hàng.
     */
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'order_code' => 'required|unique:orders,order_code,' . $order->id,
            'shipping_fee' => 'nullable|numeric',
            'shipper_id' => 'nullable|exists:shippers,id',
            'voucher_id' => 'nullable|exists:vouchers,id',
            'total_price' => 'required|numeric|min:0',
            'phone_number' => 'required',
            'email' => 'required|email',
            'address' => 'required|string|max:255',
            'note' => 'nullable|string|max:255',
        ]);

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
            return redirect()->route('admin.orders.index')->with('success', 'Đơn hàng đã được cập nhật thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Có lỗi xảy ra khi cập nhật đơn hàng: ' . $e->getMessage());
        }
    }

    /**
     * Xóa đơn hàng khỏi hệ thống.
     */
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return redirect()->route('orders.index')->with('success', 'Đơn hàng đã được xóa thành công');

    }
}
