<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\cart_items;
use App\Models\Carts;
use Illuminate\Http\Request;

class ApiCartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {

        $cart = Carts::where('user_id', $request->user()->id)->with('product')->first();
        return response()->json($cart ?? ['message' => 'Giỏ hàng trống'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function destroy(string $id)
    {
        //
    }
}
