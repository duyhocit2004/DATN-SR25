<?php

namespace App\Services\Client\product;

use Illuminate\Http\Request;

interface IProductService
{

    public function getAllSizes(Request $request);

    public function getAllColors(Request $request);

    public function getAllProductWithImages(Request $request);

    public function getProduct(Request $request);

    public function getProductDetail(Request $request);

    public function getColorByProductIdAndSize(Request $request);

    public function getSizeByProductIdAndColor(Request $request);

    public function getTopDiscountedProducts(Request $request);

    public function getTopNewestProducts(Request $request);

    public function getTopBestSellingProducts(Request $request);

    public function getRelatedProducts(Request $request);

}
