<?php

namespace App\Repositories;

use App\Models\imageProduct;
use App\Models\products;

class IamgeRepositories {
    public function inserImage($id,$image){
        // dd($image);
    foreach ($image as $value) {
        $forimage = null;
        if($value->isValid()){
            $forimage = $value->store('product','public');
            imageProduct::create([
                'products_id'=>$id,
                'image_link'=>$forimage
            ]);
        }
    }
      
        return true;

    }
    public function getimage($id){
        $list = imageProduct::where('products_id','=',$id)->get();
        return $list;
    }
}