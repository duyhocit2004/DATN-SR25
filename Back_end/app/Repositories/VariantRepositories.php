<?php

namespace App\Repositories;

use App\Models\ProductVariants;

class VariantRepositories
{
    public function create($id, $data)
    {
        // dd($data);
        foreach ($data as $as) {
            ProductVariants::create([
                'product_id' => $id,
                'color_id' => $as['color_id'],
                'size_id' => $as['size_id'],
                'quanlity' => $as['quanlity'],
                'price' => $as['price'],
                'view' => 0,
                'content' => null
            ]);
        }
        return true;
    }
    public function getid($id){
        return ProductVariants::where('product_id','=',$id)->get();

    }

}