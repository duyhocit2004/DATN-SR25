<?php

namespace App\Services\Admin\product;

use Illuminate\Http\Request;

interface IAdminProductService
{
    public function addProductWithVariant(Request $request);

    public function updateProductWithVariant(Request $request);
    public function deleteProduct(Request $request);

}
