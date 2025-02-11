<?php

namespace App\Repositories;

use App\Models\imageProduct;
use App\Models\products;

class ProductRepositories {
    public function GetAll(){
        $list = products::get();
        return $list;
    }
    public function getoneimge($id){
        $list = imageProduct::where('product_id','=',$id)->first();
        return $list;

    }
    public function getpaginate(){
        $list = products::paginate(5);
        return $list;
    }

    public function GetOne($id){
        return  products::findOrFail($id);
    }

    public function create($data) {
        $image = $data['file'];
        $filedata = null;
        $filedata = $image->store('product','public');
        $list = products::create([
            'categories_id' => $data['categories_id'], // Sử dụng mảng thay vì đối tượng
            'name_product' => $data['product'],
            'image'=>$filedata,
            'base_stock' => $data['quanlity'], // Vẫn sử dụng 'quanlity'
            'price_regular' => $data['price_regular'],
            'price_sale' => $data['price_sale'],
            'SKU'=>'KS@@',
            'description' => strip_tags($data['description']),
            'views' => 0
        ]);


        return $list->id ; // Trả về đối tượng sản phẩm đã tạo
    }
    public function Update($id,$data) {
        $list = products::findOrFail($id);
        return $list->update($data);

    }
}

