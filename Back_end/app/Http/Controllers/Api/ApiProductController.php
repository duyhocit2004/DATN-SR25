<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApiProductController extends Controller
{
    /**
     * Danh sách sản phẩm
     */
    public function index()
    {
        $products = products::query()->get();

        return response()->json($products);

        // $products = $query->paginate(2);

        // return ($products);
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
        $products = products::query()->findOrFail($id);

        return new ProductResource($products);

        return response()->json([
            'data' => ProductResource::collection($products),
            'success' => true,
            'message' => 'Chi tiết sản phẩm'
        ], 200);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $id)
    {
        $products = products::query()->findOrFail($id);

        $params = $request->all();

        if ($request->hasFile('image')) {

            if ($products->image && Storage::disk('public')->exists($products->image)) {

                Storage::disk('public')->delete($products->image);
            }

            $imagePath = $request->file('image')->store('uploads/products', 'public');

            $params['image'] = $imagePath;
        }
        $products->update($params);

        return response()->json([
            'data' => new ProductResource($products),
            'success' => true,
            'message' => 'Sửa thành công'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $products = products::query()->findOrFail($id);

        if ($products->image && Storage::disk('public')->exists($products->image)) {

            Storage::disk('public')->delete($products->image);
        }

        $products->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xóa thành công'
        ], 204);
    }
}
