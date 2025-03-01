<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\products;
use App\Models\ProductVariants;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

class ApiVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $VariantColor = ProductVariants::query()->get();
        return response()->json($VariantColor);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
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
        $variant = $request->all();
        $idVariant  = ProductVariants::query()->findOrFail($id);
        $idVariant->update($variant);

        return response()->json([
            'messae'=>"sủa thành công",
            'tatus'=>true
        ],204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $id = ProductVariants::findOrFail($id);
        $id->delete();
        return Response()->json([
            'success' => 'xóa thành công'
        ],204);
    }
}
