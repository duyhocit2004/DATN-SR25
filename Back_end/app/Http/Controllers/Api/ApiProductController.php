<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\products;
use Illuminate\Http\Request;

class ApiProductController extends Controller
{
    /**
     * Danh sách sản phẩm
     */
    public function index()
    {
        $query = products::query()->get();

        // return response()->json($products);

        $products = $query->paginate(2);

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $params = $request->all();

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads/products', 'public');
            $params['image'] = $imagePath;
        }

        $products = Products::create($params);

        return response()->json([
            'data' => new ProductResource($products),
            'success' => true,
            'message' => 'Thêm thành công'
        ], 201);
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
