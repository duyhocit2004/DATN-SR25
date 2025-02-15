<?php

namespace App\Repositories;

use App\Models\imageProduct;
use App\Models\products;
use Illuminate\Support\Facades\Storage;

class ProductRepositories
{
    public function GetAll()
    {
        $list = products::get();
        return $list;
    }
    public function getoneimge($id)
    {
        $list = imageProduct::where('product_id', '=', $id)->first();
        return $list;
    }
    public function getpaginate()
    {
        $list = products::paginate(5);
        return $list;
    }

    public function GetOne($id)
    {
        return  products::findOrFail($id);
    }

    public function create($data)
    {
        $image = $data['file'];
        $filedata = null;
        $filedata = $image->store('product', 'public');
        $list = products::create([
            'categories_id' => $data['categories_id'], // Sử dụng mảng thay vì đối tượng
            'name_product' => $data['product'],
            'image' => $filedata,
            'base_stock' => $data['quanlity'], // Vẫn sử dụng 'quanlity'
            'price_regular' => $data['price_regular'],
            'price_sale' => $data['price_sale'],
            'SKU' => 'KS@@',
            'description' => strip_tags($data['description']),
            'views' => 0
        ]);

        return $list->id; // Trả về đối tượng sản phẩm đã tạo
        
    }
    public function Update($id, $data)
    {
        // lấy dữ liệu từ ID
        $id = products::findOrFail($id);

        // tạo 1 biến để lưu trữ ảnh mới
        $filedata = null;
        // kiểm tra ảnh có tồn tại hay không
        if (isset($data['file']) && $data['file']) {
            $oldImagePath = public_path('product/' . $id->image); // Đường dẫn tới hình ảnh cũ
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath); // Xóa file
            }
            $filedata = $data['file']->Store('product', 'public');
        } else {
            // Giữ nguyên hình ảnh cũ nếu không có hình mới
            $filedata = $id->image;
        }
        //  dd($filedata);
        $id->update([
            'categories_id' => $data['categories_id'], // Sử dụng mảng thay vì đối tượng
            'name_product' => $data['product'],
            'image' => $filedata,
            'base_stock' => $data['quanlity'], // Vẫn sử dụng 'quanlity'
            'price_regular' => $data['price_regular'],
            'price_sale' => $data['price_sale'],
            'SKU' => 'KS@@',
            'description' => strip_tags($data['description']),
            'views' => 0
        ]);

        return $id;
    }
    public function trashedProducts()
    {
        $listDelete = products::onlyTrashed()->paginate(8);
        return $listDelete;
    }
    public function restoreProduct($id)
    {
        $restoreDelete = products::withTrashed()->findOrFail($id);
        $restoreDelete->restore();
        return $restoreDelete;
    }
    public function forceDelete($id)
    {
        $forceDelete = products::withTrashed()->findOrFail($id);
        $forceDelete->forceDelete();
        return $forceDelete;
    }
}
