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

        return response()->json($cart);
    }

    // Show chi tiết giỏ hàng
    public function show($id)
    {
        $cart = Carts::with('items.productVariants')->findOrFail($id);

        return response()->json($cart);
    }

    // Xóa giỏ hàng
    public function destroy($id)
    {
        $cart = Carts::findOrFail($id);

        // Xóa tất cả cart_items trước khi xóa giỏ hàng
        $cart->items()->delete();

        // Xóa giỏ hàng
        $cart->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xóa giỏ hàng thành công'
        ], 200);
    }

    // Thêm mục vào giỏ hàng


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

        // Kiểm tra cart item có tồn tại không
        $cartItem = cart_items::where('cart_id', $cartId)->find($itemId);
        if (!$cartItem) {
            return response()->json(['message' => 'Không tìm thấy sản phẩm trong giỏ hàng'], 404);
        }

        // Cập nhật số lượng
        $cartItem->update([
            'quantity' => $request->quantity,
            'sub_total' => $request->quantity * ProductVariants::findOrFail($cartItem->product_variants_id)->price,
        ]);

        return response()->json(['message' => 'Cập nhật thành công', 'cart_item' => $cartItem]);
    }


    // Xóa mục khỏi giỏ hàng
    public function destroyItem($cartId, $itemId)
    {
        // Tìm item trong giỏ hàng
        $cartItem = cart_items::where('cart_id', $cartId)->findOrFail($itemId);

        // Xóa item khỏi giỏ hàng
        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xóa sản phẩm khỏi giỏ hàng thành công'
        ]);
    }

    //Thêm mục vào giỏ hàng
    public function addItem(Request $request, $cartId)
    {
        $request->validate([
            'product_variants_id' => 'required|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Tìm giỏ hàng theo $cartId
        $cart = Carts::find($cartId);

        // Nếu không có giỏ hàng, trả về lỗi
        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy giỏ hàng với ID: ' . $cartId
            ], 404);
        }

        $variant = ProductVariants::findOrFail($request->product_variants_id);

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        $existingItem = $cart->items()->where('product_variants_id', $variant->id)->first();

        if ($existingItem) {
            // Nếu sản phẩm đã có, cập nhật số lượng
            $existingItem->quantity += $request->quantity;
            $existingItem->sub_total = $existingItem->quantity * $variant->price;
            $existingItem->save();
        } else {
            // Nếu chưa có, thêm mới vào giỏ hàng
            $cart->items()->create([
                'product_variants_id' => $variant->id, // Đảm bảo lấy đúng ID sản phẩm
                'quantity' => $request->quantity,
                'sub_total' => $request->quantity * $variant->price,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Thêm sản phẩm vào giỏ hàng thành công',
            'data' => $cart->load('items')
        ]);
    }


    private function getCart(Request $request, $createIfNotExists = false)
    {
        // Nếu người dùng đã đăng nhập, lấy giỏ hàng của họ
        if ($request->user()) {
            $cart = Carts::where('user_id', $request->user()->id)->first();
        } else {
            // Nếu là khách, kiểm tra guest_id từ cookie
            $guestId = $request->cookie('guest_id');
            if (!$guestId) {
                return null; // Không tạo mới giỏ hàng
            }

            $cart = Carts::where('guest_id', $guestId)->first();
        }

        if (!$cart && $createIfNotExists) {
            $cart = new Carts();
            if ($request->user()) {
                $cart->user_id = $request->user()->id;
            } else {
                $cart->guest_id = $guestId;
            }
            $cart->save();
        }

        return $cart;
    }


    public function getListCart(Request $request)
    {
        // Kiểm tra xác thực người dùng
        if (!$request->user()) {
            return response()->json([
                'success' => false,
                'message' => 'Người dùng chưa được xác thực',
                'data' => []
            ], 401);
        }

        // Lấy ID người dùng
        $userId = $request->user()->id;

        // Kiểm tra nếu $userId là null
        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy ID người dùng',
                'data' => []
            ], 400);
        }

        // Lấy giỏ hàng của người dùng
        $cart = Carts::where('user_id', $userId)->first();

        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy giỏ hàng',
                'data' => []
            ]);
        }

        // Lấy các sản phẩm trong giỏ hàng, tránh vấn đề N+1 bằng with('product')
        $cartItems = Cart_items::where('cart_id', $cart->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Giỏ hàng trống',
                'data' => []
            ]);
        }

        // Chuẩn bị danh sách sản phẩm
        // $products = $cartItems->map(function ($item) {
        //     return [
        //         'product_id' => optional($item->products->name_product),
        //         // 'size' => ,
        //         'name'       => optional($item->product)->name,
        //         'price'      => optional($item->product)->price,
        //         'quantity'   => $item->quantity,
        //         'total'      => optional($item->product)->price * $item->quantity
        //     ];
        // });

        return response()->json([
            'success' => true,
            'message' => 'Đã lấy sản phẩm trong giỏ hàng thành công',
            'data' => []
        ]);
    }
}
