<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\cart_items;
use App\Models\Carts;
use App\Models\products;
use App\Models\ProductVariants;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
        public function index()
        {
            $carts = cart_items::all();//with(['productVariant'])->get();
            // dd($carts);
            return view('admin.carts.listCart', compact('carts'));
        }

        public function store($id)
        {
        //     $request->validate([
        //         'product_id' => 'required|exists:product_items,id',
        //         'quantity' => 'required|integer|min:1'
        //     ]);

        //     $user = Auth::user();
        //     $productItem = ProductVariants::findOrFail($request->product_item_id);

        //     $cartItem = cart_items::where('user_id', $user->id)
        //         ->where('product_id', $productItem->id)
        //         ->first();

        //     if ($cartItem) {
        //         $cartItem->quantity += $request->quantity;
        //         $cartItem->save();
        //     } else {
        //         cart_items::create([
        //             'user_id' => $user->id,
        //             'product_id' => $productItem->id,
        //             'quantity' => $request->quantity,
        //         ]);
        //     }

        //     return redirect()->route('admin.carts.listCart')->with('success', 'Tạo giỏ hàng thành công!');
        // }

        $product = DB::table('products')->where('id',$id)->first();

        dd($product);
    }

}
