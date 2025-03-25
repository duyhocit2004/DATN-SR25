<?php

namespace App\Repositories;

use App\Models\ProductVariant;

class VariantRepositories
{
    public function getColorByProductIdAndSize($request)
    {
        $variants = ProductVariant::select('colors.code', 'product_variants.quantity')
            ->join('colors', 'colors.id', '=', 'product_variants.color_id')
            ->join('sizes', 'sizes.id', '=', 'product_variants.size_id')
            ->where('product_variants.product_id', $request->input('productId'))
            ->where('sizes.size', $request->input('size'))
            ->get();

        return $variants;
    }

    public function getSizeByProductIdAndColor($request)
    {
        $variants = ProductVariant::select('sizes.size', 'product_variants.quantity')
            ->join('colors', 'colors.id', '=', 'product_variants.color_id')
            ->join('sizes', 'sizes.id', '=', 'product_variants.size_id')
            ->where('product_variants.product_id', $request->input('productId'))
            ->where('colors.code', $request->input('color'))
            ->get();

        return $variants;
    }
}
