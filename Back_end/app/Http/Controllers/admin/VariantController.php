<?php

namespace App\Http\Controllers\admin;

use App\Services\Categories\CategoryService;
use App\Services\size\sizeService;
use App\Services\color\ColorService;
use App\Services\product\VariantService;
use App\Http\Controllers\Controller;
use App\Repositories\IamgeRepositories;
use App\Services\product\ProductService;

use App\Models\products;
use App\Models\ProductVariants;
use Illuminate\Http\Request;

class VariantController extends Controller
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

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        if (empty($search)) {
            // Nếu không có tìm kiếm, lấy toàn bộ danh sách sản phẩm
            $list = ProductVariants::orderBy('id', 'DESC')->paginate(7);
        } else {
            // Nếu có tìm kiếm, lọc theo tên sản phẩm
            $list = ProductVariants::join('products', 'product_variants.product_id', '=', 'products.id')
                ->where('products.name_product', 'like', "%{$search}%")
                ->select('product_variants.*') // Chọn tất cả các trường từ product_variants
                ->orderBy('product_variants.id', 'DESC')
                ->paginate(7);
        }
        return view('admin.products.variantproduct.listVariant',compact('list'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $id)
    {
        $product = $this->ProductService->GetId($id);
        // dd($product);
        $color = $this->colorService->getAll();
        $size = $this->sizeService->Getall();
        return view('admin.products.variantproduct.createVariant',compact('product','color','size'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $data = $request->all();
        $this->VariantService->create($data);
        return redirect()->route('variant.index')->with('cusses','thêm biến thể sản phẩm thành công');
      
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $list = $this->ProductService->Getpaginate();
        // $imageproduct =  $this->ProductService->getoneimge($list->id);
        return view('admin.products.variantproduct.showVariant', compact('list'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $listVariant = ProductVariants::findOrFail($id);

        // lấy info sản phẩm
        $idproduct = $listVariant->product_id;
        $product = $this->ProductService->GetId($idproduct);
        // dd($product);
        $color = $this->colorService->getAll();
        $size = $this->sizeService->Getall();

        return view('admin.products.variantproduct.editVariant',compact('product','listVariant','color','size'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $listVariant = $request->all();
        $variant = $this->VariantService->insertId($id, $listVariant);
        return $variant;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $idVariant = ProductVariants::findOrFail($id);
        $idVariant->delete();
        return redirect()->route('variant.index')->with('cusses','biến thể được Xóa thành công');
      
    }
}
