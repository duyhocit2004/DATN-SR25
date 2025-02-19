<?php

namespace App\Http\Controllers\admin;

use App\Models\products;
use App\Models\imageProduct;
use Illuminate\Http\Request;
use App\Models\ProductVariants;
use App\Services\size\sizeService;
use App\Http\Controllers\Controller;
use App\Services\color\ColorService;
use Illuminate\Contracts\Cache\Store;
use App\Repositories\IamgeRepositories;

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;
use App\Services\product\ProductService;
use App\Services\product\VariantService;
use App\Services\Categories\CategoryService;

class ProductController extends Controller
{
    public $ProductService;
    public $categoryService;
    public $colorService;
    public $sizeService;
    public $VariantService;
    public $IamgeRepositories;

    public function __construct(
        ProductService $ProductService,
        CategoryService $categoryService,
        sizeService $sizeService,
        ColorService $colorService,
        VariantService $VariantService,
        IamgeRepositories $IamgeRepositories,
    ) {

        $this->ProductService = $ProductService;
        $this->sizeService = $sizeService;
        $this->colorService = $colorService;
        $this->categoryService = $categoryService;
        $this->VariantService = $VariantService;
        $this->IamgeRepositories = $IamgeRepositories;
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

        $idproduct = $this->ProductService->insert($list);
        if ($request->has('variants')) {
            $this->VariantService->insert($idproduct, $variant);
        }
        if ($request->hasFile('images')) {
            $this->IamgeRepositories->inserImage($idproduct, $image);
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
        // dd($iamge);  
        return view('admin.products.editProduct', compact('idproduct', 'size', 'categori', 'iamge', 'variant', 'color'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $list = $request->except('_token', '_method', 'variants' ,'images');
        $idproduct = $this->ProductService->insertId($id, $list);
        if($request->has('images')){

            $images1 = $request->file('images');
            $existingImages = imageProduct::where('products_id', '=', $id)->get();
    
            // Xóa tất cả ảnh cũ
            foreach ($existingImages as $image) {
                if (Storage::disk('public')->exists($image->image_link)) {
                    Storage::disk('public')->delete($image->image_link);
                }
                // Xóa bản ảnh trong cơ sở dữ liệu
                $image->delete();
            }
        
            // Lưu ảnh mới
            // dd($image);
                foreach ($images1 as $file) {
                        $imagePath = null;
                        $imagePath = $file->store('public');
                        imageProduct::create([
                            'products_id' => $id,
                            'image_link' => $imagePath
                        ]);
                }
        
            // $this->IamgeRepositories->updateImage($id,$images);
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
