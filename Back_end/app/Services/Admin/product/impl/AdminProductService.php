<?php

namespace App\Services\Admin\product\impl;

use App\Helpers\BaseResponse;
use App\Models\ImageProduct;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Repositories\ProductRepositories;
use App\Repositories\VariantRepositories;
use App\Services\Admin\product\IAdminProductService;
use Cloudinary\Cloudinary;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class AdminProductService implements IAdminProductService
{
    public ProductRepositories $productRepositories;
    public VariantRepositories $variantRepositories;

    protected $cloudinary;

    public function __construct(ProductRepositories $productRepositories,
                                VariantRepositories $variantRepositories,
                                Cloudinary $cloudinary)
    {
        $this->productRepositories = $productRepositories;
        $this->variantRepositories = $variantRepositories;
        $this->cloudinary = $cloudinary;
    }

    public function addProductWithVariant(Request $request)
    {

        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $this->validateAddProductWithVariant($request);

        try {

            $product = [
                'categories_id' => $request->input('categoryId'),
                'name' => $request->input('name'),
                'price_regular' => $request->input('price'),
                'description' => $request->input('description'),
                'views' => 0,
                'rate' => 0,
                'content' => $request->input('content'),
                'discount' => $request->input('discount', 0),
                'quantitySold' => 0,
            ];

            if ($request->hasFile('image')) {
                $uploadedFile = $this->cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), ['folder' => 'products', 'verify' => false]);
                $product['image'] = $uploadedFile['secure_url'];
            }

            if ($request->input('discount') !== null) {
                $product['price_sale'] = $request->input('price') * (1 - $request->input('discount') / 100) ;
            } else {
                $product['price_sale'] = $request->input('price');
            }

            $listVariants = json_decode($request->input('variants'), true);
            $toTatalQuantity = 0;
            foreach ($listVariants as &$variant) {
                $toTatalQuantity = $toTatalQuantity + $variant['quantity'];
                $variant['color_id'] = $variant['color'];
                $variant['size_id'] = $variant['size'];
            }
            $product['quantity'] = $toTatalQuantity;

            DB::beginTransaction();
            $productInsertResponse = Product::create($product);

            $listImage = [];
            if ($request->hasFile('albumImage')) {
                $albumImage = $request->file('albumImage');

                if (!is_array($albumImage)) {
                    $albumImage = [$albumImage];
                }

                foreach ($albumImage as $file) {
                    $uploadedFile = $this->cloudinary->uploadApi()->upload($file->getRealPath(), ['folder' => 'products', 'verify' => false]);
                    $imageProduct = [
                        "products_id" => $productInsertResponse->id,
                        "image_link" => $uploadedFile['secure_url']
                    ];
                    $listImage[] = $imageProduct;
                }
            }

            foreach ($listVariants as &$variant) {
                $variant['product_id'] = $productInsertResponse->id;
            }
            unset($variant);

            foreach ($listVariants as $variant) {
                ProductVariant::create($variant);
            }

            foreach ($listImage as $image) {
                ImageProduct::create($image); // Thêm từng ảnh vào DB
            }

            DB::commit();

            return $product;
        } catch (Exception $e) {
            DB::rollBack();
            BaseResponse::failure(500, '', $e->getMessage(), []);
//            BaseResponse::failure(500, "System error addProductWithVariant", []);
        }
    }

    private function validateAddProductWithVariant(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'categoryId' => 'required|integer',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'discount' => 'nullable|integer|min:0',
            'variants' => 'nullable|string'
        ], [
            'categoryId.required' => 'categoryId.is.required',
            'name.required' => 'name.is.required',
            'price.required' => 'price.is.required',
            'variants.string' => 'variants.size.is.required',
            'description.string' => 'description.is.string',
            'discount.integer' => 'discount.is.integer',
        ]);

        if ($validate->fails()) {
            BaseResponse::failure(400, '', $validate->errors()->first(), []);
        }
    }

    public function updateProductWithVariant(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $userId = $user->id;
            if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
                JWTAuth::invalidate(JWTAuth::getToken());
                return BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
            }

            $product = $this->productRepositories->getProductDetail($request->input('productId'));
            $newProduct = [];
            if(!empty($request->input('categoryId'))){
                $newProduct['categories_id'] = $request->input('categoryId');
            }else{
                $newProduct['categories_id'] = $product->categories_id;
            }

            if(!empty($request->input('name'))){
                $newProduct['name'] = $request->input('name');
            }else{
                $newProduct['name'] = $product->name;
            }

            if(!empty($request->input('price'))){
                $newProduct['price_regular'] = $request->input('price');
            }else{
                $newProduct['price_regular'] = $product->price_regular;
            }

            if(!empty($request->input('description'))){
                $newProduct['description'] = $request->input('description');
            }else{
                $newProduct['description'] = $product->description;
            }

            if(!empty($request->input('views'))){
                $newProduct['views'] = $request->input('views');
            }else{
                $newProduct['views'] = $product->views;
            }

            if(!empty($request->input('rate'))){
                $newProduct['rate'] = $request->input('rate');
            }else{
                $newProduct['rate'] = $product->rate;
            }

            if(!empty($request->input('content'))){
                $newProduct['content'] = $request->input('content');
            }else{
                $newProduct['content'] = $product->content;
            }

            if(!empty($request->input('discount'))){
                $newProduct['discount'] = $request->input('discount');
            }else{
                $newProduct['discount'] = $product->discount;
            }

            if(!empty($request->input('quantitySold'))){
                $newProduct['quantity_sold'] = $request->input('quantitySold');
            }else{
                $newProduct['quantity_sold'] = $product->quantity_sold;
            }

            if ($request->input('discount') !== null) {
                $newProduct['price_sale'] = $request->input('price') * (1 - $request->input('discount') / 100) ;
            } else {
                $newProduct['price_sale'] = $request->input('price');
            }

            $newList = json_decode($request->input('variants'), true);
            $originalList = $product->product_variants;
            $toTatalQuantity = 0;

//            $variants = $this->updateList($originalList, $newList);
//            foreach ($variants as $variant) {
//                $toTatalQuantity += $toTatalQuantity + $variant['quantity'];
//            }
//            $product['quantity'] = $toTatalQuantity;

            $originalListMap = [];
            foreach ($originalList as $item) {
                $originalListMap[$item['id']] = $item;
            }

            $newListMap = [];
            foreach ($newList as $item) {
                $newListMap[$item['id']] = $item;
            }

            DB::beginTransaction();
            // Tìm và xoá các mục có trong danh sách gốc nhưng không có trong danh sách mới
            foreach ($originalList as $key => $item) {
                if (!isset($newListMap[$item['id']])) {
                    ProductVariant::query()->where('id', '=', $item->id)->delete();
                }
            }

            // Thêm hoặc cập nhật các mục mới trong danh sách gốc
            foreach ($newList as $newItem) {
                $newVariant = [
                    "product_id" => $product->id,
                    "color_id" => $newItem['color'],
                    "size_id" => $newItem['size'],
                    "quantity" => $newItem['quantity'],
                ];
                if (isset($originalListMap[$newItem['id']])) {
                    $productVariant = ProductVariant::where('id', $newItem['id'])->first();
                    if ($productVariant) {
                        $productVariant->update($newVariant);
                        $toTatalQuantity += $toTatalQuantity + $newItem['quantity'];
                    }
                } else {
                    ProductVariant::create($newVariant);
                    $toTatalQuantity += $toTatalQuantity + $newItem['quantity'];
                }
            }

            $product['quantity'] = $toTatalQuantity;

            if ($request->hasFile('image')) {
                ImageProduct::query()->where('products_id', '=', $product->id)->delete();
                $uploadedFile = $this->cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), ['folder' => 'products', 'verify' => false]);
                $newProduct['image'] = $uploadedFile['secure_url'];
            }

            $product->update($newProduct);

            $listImage = [];
            if ($request->hasFile('albumImage')) {
                $albumImage = $request->file('albumImage');

                if (!is_array($albumImage)) {
                    $albumImage = [$albumImage];
                }

                foreach ($albumImage as $file) {
                    $uploadedFile = $this->cloudinary->uploadApi()->upload($file->getRealPath(), ['folder' => 'products', 'verify' => false]);
                    $imageProduct = [
                        "products_id" => $product->id,
                        "image_link" => $uploadedFile['secure_url']
                    ];
                    $listImage[] = $imageProduct;
                }
            }

//            foreach ($variants as &$variant) {
//                $productVariant = ProductVariant::findOrFail($variant['id']);
//                $newVariant = [
//                    "product_id" => $product->id,
//                    "color_id" => $variant->color_id,
//                    "size_id" => $variant->size_id,
//                    "quantity" => $variant->quantity,
//                ];
//                if (is_array($variant)) {
//                    $productVariant->update($newVariant);
//                }
//
//            }

            foreach ($listImage as $image) {
                ImageProduct::create($image); // Thêm từng ảnh vào DB
            }

            DB::commit();


        } catch (Exception $e) {
            DB::rollBack();
            BaseResponse::failure(500, '', $e->getMessage(), []);
//            BaseResponse::failure(500, "System error addProductWithVariant", []);
        }
    }

    function updateList($originalList, $newList) {
        $originalListMap = [];
        foreach ($originalList as $item) {
            $originalListMap[$item['id']] = $item;
        }

        $newListMap = [];
        foreach ($newList as $item) {
            $newListMap[$item['id']] = $item;
        }

        // Tìm và xoá các mục có trong danh sách gốc nhưng không có trong danh sách mới
        foreach ($originalList as $key => $item) {
            if (!isset($newListMap[$item['id']])) {
                // Xoá mục khỏi danh sách gốc
                unset($originalList[$key]);
            }
        }

        // Thêm hoặc cập nhật các mục mới trong danh sách gốc
        foreach ($newList as $newItem) {
            if (isset($originalListMap[$newItem['id']])) {
                // Cập nhật mục có sẵn trong danh sách gốc
                $originalListMap[$newItem['id']] = $newItem;
            } else {
                // Thêm mục mới vào danh sách gốc
                $originalList[] = $newItem;
            }
        }

        // Trả về danh sách gốc đã được cập nhật
        return $originalList;
    }

    public function deleteProduct(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $category = $this->productRepositories->deleteProduct($request);
        return $category;
    }

}
