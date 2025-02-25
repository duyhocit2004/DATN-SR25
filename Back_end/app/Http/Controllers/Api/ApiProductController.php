<?php

namespace App\Http\Controllers\Api;

use Cloudinary\Cloudinary;
use App\Models\products;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;
use App\Services\product\ProductService;


class ApiProductController extends Controller
{
    public $ProductService;
    protected $cloudinary;

    public function __construct(ProductService $ProductService, Cloudinary $cloudinary)
    {
        $this->ProductService = $ProductService;
        $this->cloudinary = $cloudinary;
    }

    public function index()
    {
        $products = products::query()->get();

        return response()->json([
            'data' => new ProductResource($products),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        if (!$request->hasFile('image')) {
            return response()->json(['error' => 'Image file is required'], 400);
        }
        $params = $request->all();
        $uploadedFile = $this->cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), ['folder' => 'products', 'verify' => false]);
        $params['image'] = $uploadedFile['secure_url'];

        $products = Products::create($params);

        return response()->json([
            'data' => $products,
            'success' => true,
            'message' => 'Thêm thành công'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $products = Products::query()->findOrFail($id);

        // // return new ProductResource($products);

        return response()->json([
            'data' => $products,
            'success' => true,
            'message' => 'Chi tiết sản phẩm'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, ProductRequest $request)
    {
        try {
            $products = products::query()->findOrFail($id);
            $params = $request->all();

            if ($request->hasFile('image')) {
                if ($products->image) {

                    $publicId = pathinfo($products->image, PATHINFO_FILENAME);

                    $this->cloudinary->adminApi()->deleteAssets([$publicId]);
                } else if ($request->hasFile('image')) {
                    // Upload ảnh mới lên Cloudinary
                    $uploadedFile = $this->cloudinary->uploadApi()->upload(
                        $request->file('image')->getRealPath(),
                        ['folder' => 'products', 'verify' => false]
                    );

                    // Cập nhật URL hình ảnh mới vào `params`
                    $params['image'] = $uploadedFile['secure_url'];
                }
            } else {
                //Nếu không có trường `image` trong request => Giữ nguyên ảnh cũ
                $params['image'] = $products->image;
            }

            // Cập nhật sản phẩm
            $products->update($params);

            return response()->json([
                'data' => $products,
                'success' => true,
                'message' => 'Sửa thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage()
            ], 500);
        }

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
        ], 200);
    }
    public function getid(string $id)
    {
        $products = products::findOrFail($id);

        // return new ProductResource($products);

        return response()->json([
            'data' => $products,
            'success' => true,
            'message' => 'Chi tiết sản phẩm'
        ], 200);
    }
}
