<?php

namespace App\Repositories;

use App\Models\products;
use App\Models\imageProduct;
use Illuminate\Support\Facades\Storage;

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
    public function updateImage($id, $image) {
        // dd($image);
        // Lấy tất cả ảnh của sản phẩm theo products_id
        $images = imageProduct::where('products_id','=', $id)->get();
    
        // Xóa tất cả ảnh cũ
        foreach ($images as $image) {
            // Xóa tệp ảnh khỏi hệ thống tệp
            if (Storage::disk('public')->exists($image->image_link)) {
                Storage::disk('public')->delete($image->image_link);
            }
            // Xóa bản ghi ảnh trong cơ sở dữ liệu
            $image->delete();
        }
    
        // Lưu ảnh mới
            foreach ($image as $file) {
                if ($file->isValid()) {
                    $imagePath = $file->store('product', 'public');
                    imageProduct::create([
                        'products_id' => $id,
                        'image_link' => $imagePath
                    ]);
                }
            }
    
        return true;
    }
}