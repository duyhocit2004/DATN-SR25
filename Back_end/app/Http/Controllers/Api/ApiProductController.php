<?php

namespace App\Http\Controllers\Api;

use App\Models\products;
use Cloudinary\Cloudinary;
use App\Models\imageProduct;
use Illuminate\Http\Request;
use App\Models\ProductVariants;
use App\Services\Size\sizeService;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\color;
use App\Models\Size;
use App\Repositories\IamgeRepositories;
use Illuminate\Support\Facades\Storage;
use App\Services\product\ProductService;
use App\Services\product\VariantService;

class ApiProductController extends Controller
{
    public $ProductService;
    protected $cloudinary;
    public $VariantService;
    public $IamgeRepositories;
    public $sizeService;
    public $colorService ;
    public function __construct(ProductService $ProductService,
     Cloudinary $cloudinary,
     VariantService $VariantService,
     IamgeRepositories $IamgeRepositories,
     sizeService $sizeService)
    {
        $this->ProductService = $ProductService;
        $this->cloudinary = $cloudinary;
        $this->VariantService = $VariantService;
        $this->IamgeRepositories=$IamgeRepositories;
        $this->sizeService =$sizeService;
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
        $params = $request->only('categories_id','name_product','image','base_stock','price_regular','price_sale','description','contentcontent');
        
        
        if (!$request->hasFile('image')) {
            return response()->json(['error' => 'Image file is required'], 400);
        }
       
        $uploadedFile = $this->cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), ['folder' => 'products', 'verify' => false]);
        $params['image'] = $uploadedFile['secure_url'];

        $products = Products::create($params);

        if ($request->has('variants')) {
            $variant = $request->only('variants');

            foreach ($variant as $value) {
                if (isset($value['id'])) {
                    $existingVariant = ProductVariants::find($value['id']);
                    if (isset($existingVariant)) {
                        $this->VariantService->insertId($existingVariant->id, $value);
                    }
                } else {
                    $this->VariantService->createNotForeach($products->id, $value);
                }

            }
        }
        
        if ($request->hasFile('images')) {
            $AlbumImage = $request->only('images');
            foreach ($AlbumImage as $images) {
                // Tải lên từng hình ảnh
                $uploadedFile = $this->cloudinary->uploadApi()->upload($images->getRealPath());
                // Lưu URL hình ảnh vào cơ sở dữ liệu
                $this->IamgeRepositories->inserImage($products->id, $uploadedFile['secure_url']);
            }
        }


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
        $albumproduct = imageProduct::where('products_id','=',$id)->get();
        $variants = ProductVariants::query()->where('product_id', '=', $id)
         ->with(['color', 'size'])
         ->get();
        // // return new ProductResource($products);
        $variant = $variants->map(function ($variant) {
            return [
                'product_id'=>$variant->product_id,
                'color_name' => $variant->color ? $variant->color->name : null,
                'size_name' => $variant->size ? $variant->size->name : null,
                'quantity'=>$variant->quantity,
                'price'=>$variant->price,
            ]; // Ensure you have a valid relationship to access name
        });
        $listSize = Size::get();
        $listColor = color::get();

        return response()->json([
            
            'data' => [$products,$albumproduct,$variant],
            'list' =>[$listSize,$listColor ],
            // 'data' => $products,
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
            'message' => 'Chi tiết sản phẩm getid'
        ], 200);
    }
}
