<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\cart_items;
use App\Models\Carts;
use App\Models\ProductVariants;
use App\Services\Cart\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use PhpParser\Node\Stmt\TraitUseAdaptation;

class ApiCartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $cart = $this->getCart($request);

        // return response()->json($cart);
    }

    // Tạo giỏ hàng mới
    public function store(Request $request)
    {
        $value = false;
        $iduser = Carts::where('user_id', '=', Auth::id())->get();
        if (isset($iduser)) {
            $cart = $this->getCart($request);
            $value = true;
        }
        if ($value == true) {
            $request->validate([
                'product_variants_id' => 'required',
                'quantity' => 'required|integer',
            ]);
            $cart = $this->getCart($request, true);
            $variant = ProductVariants::findOrFail($request->product_variants_id);

            $cartItem = $cart->items()->where('product_variants_id', $variant->id)->first();

            if ($cartItem) {
                $cartItem->quantity += $request->quantity;
                $cartItem->sub_total = $cartItem->quantity * $variant->price;
                $cartItem->save();
            } else {
                $cart->items()->create([
                    'product_variants_id' => $variant->id,
                    'quantity' => $request->quantity,
                    'sub_total' => $request->quantity * $variant->price,
                ]);
            }

            return response()->json($cart->load('items'));
        }



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

    public function getListCart(Request $request)
    {
         $this->getCart($request);
        // Kiểm tra xem người dùng đã xác thực chưa
        if (!$request->user()) {
            return response()->json([
                'success' => false,
                'message' => 'Người dùng chưa được xác thực',
                'data' => []
            ], 401); // Trả về mã lỗi 401 nếu không xác thực
        }

        // Lấy giỏ hàng của người dùng
        $cart = Carts::where('user_id', $request->user()->id)->first();
            
        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy giỏ hàng',
                'data' => []
            ]);
        }

        // Lấy các sản phẩm trong giỏ hàng
        $cartItems = cart_items::where('cart_id', $cart->id)->get();

        // Lấy thông tin sản phẩm
        $products = $cartItems;

        return response()->json([
            'success' => true,
            'message' => 'Đã lấy lại sản phẩm trong giỏ hàng thành công',
            'data' => $products
        ]);
    }
}
