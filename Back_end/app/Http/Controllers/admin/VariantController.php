<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\products;
use Illuminate\Http\Request;

class VariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $list = products::paginate(5);
        return view('admin.products.variantproduct.listVariant',compact('list'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
