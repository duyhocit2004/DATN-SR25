<?php

namespace App\Http\Controllers\admin;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;
use Cloudinary\Cloudinary;

use App\Models\products;
use App\Models\imageProduct;
use App\Models\ProductVariants;

use App\Services\product\ProductService;
use App\Services\product\VariantService;
use App\Services\Categories\CategoryService;
use App\Services\size\sizeService;
use App\Services\color\ColorService;

use App\Repositories\IamgeRepositories;

class ProductController extends Controller
{
    public $ProductService;
    public $categoryService;
    public $colorService;
    public $sizeService;
    public $VariantService;
    public $IamgeRepositories;
    private $Cloudinary;

    public function __construct(
        ProductService $ProductService,
        CategoryService $categoryService,
        sizeService $sizeService,
        ColorService $colorService,
        VariantService $VariantService,
        IamgeRepositories $IamgeRepositories,
        Cloudinary $Cloudinary
    ) {

        $this->ProductService = $ProductService;
        $this->sizeService = $sizeService;
        $this->colorService = $colorService;
        $this->categoryService = $categoryService;
        $this->VariantService = $VariantService;
        $this->IamgeRepositories = $IamgeRepositories;
        $this->Cloudinary = $Cloudinary;
    }

    public function index()
    {
        // $list = $this->ProductService->getAllProduct();
        // $phone = products::find(1)->categories;
        // dd($phone);

        $list = $this->ProductService->Getpaginate();
        // $imageproduct =  $this->ProductService->getoneimge($list->id);
        return view('admin.products.listProduct', compact('list'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categori = $this->categoryService->getAll();
        $color = $this->colorService->getAll();
        $size = $this->sizeService->Getall();

        return view('admin.products.createProduct', compact('categori', ['color', 'size']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $variant = $request->input('variants');
        $image = $request->file('images');
        $list = $request->all();


        // Xử lý hình ảnh chính
        if ($request->hasFile('file')) {
            $uploadedFile = $this->Cloudinary->uploadApi()->upload($request->file('file')->getRealPath());
            $list['file'] = $uploadedFile['secure_url'];
        }
        $idproduct = $this->ProductService->insert($list);

        if ($request->has('variants')) {
            $this->VariantService->insert($idproduct, $variant);
        }
        if ($request->hasFile('images')) {
            foreach ($image as $images) {
                // Tải lên từng hình ảnh
                $uploadedFile = $this->Cloudinary->uploadApi()->upload($images->getRealPath());
                // Lưu URL hình ảnh vào cơ sở dữ liệu
                $this->IamgeRepositories->inserImage($idproduct, $uploadedFile['secure_url']);
            }
        }

        return redirect()->route('product')->with('success', 'thêm thành công');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $idproduct = $this->ProductService->GetId($id);
        $categori = $this->categoryService->getAll();
        $size = $this->sizeService->getAll();
        $color = $this->colorService->getAll();
        $variant = $this->VariantService->GetId($id);
        $iamge = $this->IamgeRepositories->getimage(['id' => $idproduct->id]);
        return view('admin.products.editProduct', compact('idproduct', 'size', 'categori', 'iamge', 'variant', 'color'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $list = $request->except('_token', '_method', 'variants', 'images');

        if($request->hasFile('file')){
            $fileimage = $this->Cloudinary->uploadApi()->upload($request->file('file')->getRealPath());
            $list['file']=$fileimage['secure_url'];
        }else{
            $listproduct = products::findOrFail($id);
            $list['file']=$listproduct['image'];
        }
        $idproduct = $this->ProductService->insertId($id, $list);
;
        if ($request->has('images')) {

            $images1 = $request->file('images');
            $existingImages = imageProduct::where('products_id', '=', $id)->get();

            foreach ($existingImages as $image) {
                $publicId = pathinfo($image->image_link, PATHINFO_FILENAME);
                $this->Cloudinary->adminApi()->deleteAssets([$publicId]);
                $image->delete();
            }

            foreach ($images1 as $file) {
                $uploadedFile = $this->Cloudinary->uploadApi()->upload($file->getRealPath());
                imageProduct::create([
                    'products_id' => $id,
                    'image_link' => $uploadedFile['secure_url']
                ]);
            }
        }

        if ($request->has('variant')) {
            $variant = $request->input('variants');

            foreach ($variant as $value) {
                if (isset($value['id'])) {
                    $existingVariant = ProductVariants::find($value['id']);
                    if (isset($existingVariant)) {
                        $this->VariantService->insertId($existingVariant->id, $value);
                    }
                } else {
                    $this->VariantService->createNotForeach($idproduct->id, $value);
                }

            }
        }

        return redirect()->route('product')->with('success', 'thêm thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $idProduct = products::findOrFail($id);
        $idProduct->delete();
        return redirect()->route('product')->with('success', 'xóa sản phẩm thành công');
    }

    public function trashedProducts()
    {
        $product = $this->ProductService->trashedProducts();
        return view('admin.products.softDelete.listDelete', compact('product'));
    }
    public function restoreProduct(string $id)
    {
        $this->ProductService->restoreProduct($id);
        return redirect()->route('ListDelete.Product')->with('successs', 'xóa thành công');
    }
    public function forceDelete(string $id)
    {
        $this->ProductService->forceDelete($id);
        return redirect()->route('ListDelete.Product')->with('successs', 'xóa thành công');
    }



}
