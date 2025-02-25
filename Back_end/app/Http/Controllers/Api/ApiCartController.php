<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\cart_items;
use App\Models\Carts;
use App\Models\ProductVariants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ApiCartController extends Controller
{
    // /**
    //  * Display a listing of the resource.
    //  */
    // public function index(Request $request)
    // {

    //     $cart = $this->getCart($request);
    //     return response()->json($cart->load('items.productVariants'));
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */


    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, string $id)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(cart_items $cartItem)
    // {
    //     $cart = $cartItem->cart;
    //     $cartItem->delete();
    //     return response()->json($cart->load('items'));
    // }


    // private function getCart(Request $request, $createIfNotExists = false)
    // {
    //     // Nếu người dùng đã đăng nhập
    //     if ($request->user()) {
    //         return Carts::firstOrCreate(['user_id' => $request->user()->id]);
    //     }

    //     // Nếu là khách, kiểm tra guest_id từ cookie
    //     $guestId = $request->cookie('guest_id') ?? Str::uuid();

    //     // Set cookie guest_id nếu chưa có
    //     if (!$request->cookie('guest_id')) {
    //         Cookie::queue('guest_id', $guestId, 60 * 24 * 30); // 30 ngày
    //     }

    //     return Carts::firstOrCreate(['guest_id' => $guestId]);
    // }

    // public function show(Request $request)
    // {
    //     $cart = $this->getCart($request);

    //     // Tải các sản phẩm trong giỏ hàng
    //     return response()->json($cart->load('items.productVariants'));
    // }

    // Lấy giỏ hàng theo ID
    public function show($id)
    {
        $cart = Carts::with('items.productVariants')->findOrFail($id);
        return response()->json($cart);
    }

    // Tạo giỏ hàng mới
    public function store(Request $request)
    {
        $request->validate([
            'guest_id' => 'nullable|string|unique:carts',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $cart = Carts::create($request->only('guest_id', 'user_id'));
        return response()->json($cart, 201);
    }

    // Cập nhật giỏ hàng
    public function update(Request $request, $id)
    {
        $cart = Carts::findOrFail($id);
        $cart->update($request->only('guest_id', 'user_id'));
        return response()->json($cart);
    }

    // Xóa giỏ hàng
    public function destroy($id)
    {
        $cart = Carts::findOrFail($id);
        $cart->delete();
        return response()->json(['message' => 'Xóa giỏ hàng thành công'], 204);
    }

    // Thêm mục vào giỏ hàng
    public function addItem(Request $request)
    {
        $request->validate([
            'product_variants_id' => 'required|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = $this->getCart($request, true);
        $variant = ProductVariants::findOrFail($request->product_variants_id);

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa

            $cart->items()->create([
                'product_variants_id' => $variant->id,
                'quantity' => $request->quantity,
                'sub_total' => $request->quantity * $variant->price,
            ]);

        return response()->json( $cart->load('items'));
    }

    // Cập nhật số lượng mục trong giỏ hàng
    public function updateItem(Request $request, $cartId, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = cart_items::where('cart_id', $cartId)->findOrFail($itemId);
        $cartItem->update([
            'quantity' => $request->quantity,
            'sub_total' => $request->quantity * ProductVariants::findOrFail($cartItem->product_variant_id)->price,
        ]);

        return response()->json($cartItem);
    }

    // Xóa mục khỏi giỏ hàng
    public function destroyItem(cart_items $cartItem)
    {
        $cart = $cartItem->cart;
        $cartItem->delete();
        return response()->json($cart->load('items'));
    }

    private function getCart(Request $request, $createIfNotExists = false)
    {
        // Nếu người dùng đã đăng nhập
        if ($request->user()) {
            return Carts::firstOrCreate(['user_id' => $request->user()->id]);
        }

        // Nếu là khách, kiểm tra guest_id từ cookie
        $guestId = $request->cookie('guest_id') ?? Str::uuid();

        // Set cookie guest_id nếu chưa có
        if (!$request->cookie('guest_id')) {
            Cookie::queue('guest_id', $guestId, 60 * 24 * 30); // 30 ngày
        }

        return Carts::firstOrCreate(['guest_id' => $guestId]);
    }
}
