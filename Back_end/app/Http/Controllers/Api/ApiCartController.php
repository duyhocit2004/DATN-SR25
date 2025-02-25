<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\cart_items;
use App\Models\Carts;
use App\Models\ProductVariants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(cart_items $cartItem)
    {
        $cart = $cartItem->cart;
        $cartItem->delete();
        return response()->json($cart->load('items'));
    }


    private function getCart(Request $request, $createIfNotExists = false)
    {
        if (Auth::check()) {
            $guestId = $request->cookie('guest_id');
            if ($guestId) {
                // Chuyển giỏ hàng từ guest_id sang user_id
                Carts::where('guest_id', $guestId)->update(['user_id' => Auth::id(), 'guest_id' => null]);
                // Xóa cookie guest_id
                cookie()->queue(cookie()->forget('guest_id'));
            }
            return Carts::firstOrCreate(
                ['user_id' => Auth::id()],
                ['created_at' => now(), 'updated_at' => now()]
            );
        }

        $guestId = $request->cookie('guest_id') ?? Str::uuid();
        if (!$request->cookie('guest_id')) {
            cookie()->queue(cookie('guest_id', $guestId, 60 * 24 * 30));
        }

        return Carts::firstOrCreate(
            ['guest_id' => $guestId],
            ['created_at' => now(), 'updated_at' => now()]
        );
    }
}
