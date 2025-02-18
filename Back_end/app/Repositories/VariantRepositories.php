<?php

namespace App\Repositories;

use App\Models\products;
use App\Models\ProductVariants;

class VariantRepositories
{
    public function getall(){
        $list = products::paginate(10);
        return $list;
    }
    public function GetPaginate(){
        $list = ProductVariants::paginate(9);
        return $list ;
    }
    public function CreateVariant($data){
        $list = ProductVariants::create($data);
        return $list;
    }
    public function create($id, $data)
    {
        dd($data);
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
    public function updateVariant($id,$data){
        $id = ProductVariants::findOrFail($id);
        $id->update($data);
        return $id ;
    }

}