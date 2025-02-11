<?php

namespace App\Http\Controllers\admin;

use App\Services\Categories\CategoryService;
use App\Services\size\sizeService;
use App\Services\color\ColorService;
use App\Services\product\VariantService;
use App\Models\products;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\IamgeRepositories;

use Illuminate\Database\QueryException;
use App\Services\product\ProductService;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
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

        $image = $request->images;

        $image = $request->file('images');

        $list = $request->all();

        dd($request);
        $idproduct = $this->ProductService->insert($list);
        $this->VariantService->insert($idproduct, $variant);
        $this->IamgeRepositories->inserImage($idproduct, $image);


        return redirect()->route('product')->with('success', 'thêm thành công');



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
        // dd($id);
        // $idvariant = $this->VariantService->GetId(['id'=>$idproduct->id]);
        $categori = $this->categoryService->getAll();
        $iamge = $this->IamgeRepositories->getimage(['id' => $idproduct->id]);
        // dd($iamge);
        return view('admin.products.editProduct', compact('idproduct', 'categori', 'iamge'));
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
