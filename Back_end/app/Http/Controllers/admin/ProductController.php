<?php

namespace App\Http\Controllers\admin;

use App\Services\Categories\CategoryService;
use App\Services\size\sizeService;
use App\Services\color\ColorService;
use App\Models\products;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Database\QueryException;
use App\Services\product\ProductService;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     */
    public $ProductService ; 
    public $categoryService ;
    public $colorService ;
    public $sizeService ;

    public function __construct(
    ProductService $ProductService, 
    CategoryService $categoryService,
    sizeService $sizeService,
    ColorService $colorService ){

        $this->ProductService = $ProductService;
        $this->sizeService = $sizeService;
        $this->colorService = $colorService;
        $this->categoryService = $categoryService;
    }
   
    public function index()
    {
        // $list = $this->ProductService->getAllProduct();    
        // $phone = products::find(1)->categories;
        // dd($phone);

        $list = $this->ProductService->Getpaginate();
        return view('admin.products.listProduct',compact('list'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {   
        $categori = $this->categoryService->getAll();
        $color = $this->colorService->getAll();
        $size = $this->sizeService->Getall();

         return view('admin.products.createProduct',compact('categori',['color','size']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        if($request->isMethod('POST')){
            $list = $request->all();
            // dd(max($list['price']));
            $sum = 0;
            if($request->has('quanlity1')){
                foreach($list['quanlity1'] as $as){
                    $sum+=$as;
                }
                if($list['price_sale'] != null && $list['price_sale'] > filter('') ){
                    
                    $id = $this->ProductService->insert($list);                                          

                }else if ($list['price_regular'] != null || $list['price_regular']){

                }
            }
        }
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
