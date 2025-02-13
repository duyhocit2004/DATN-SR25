<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductsResource;
use App\Models\products;
use Illuminate\Http\Request;
use App\Services\product\ProductService;

class ApiProductController extends Controller
{
    
    public $ProductService ;
    public function __construct(ProductService $ProductService ){
        $this->ProductService = $ProductService;
    }
    public function index()
    {
        // $products = products::query()->get();
         // return response()->json($products);
         
        $products = $this->ProductService->getAllproduct();
        return ProductsResource::collection($products);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
