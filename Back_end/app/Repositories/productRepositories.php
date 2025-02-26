<?php

namespace App\Repositories;

use App\Models\imageProduct;
use App\Models\products;
use Illuminate\Support\Facades\Storage;
use Cloudinary\Cloudinary;

class ProductRepositories
{
    // protected $Cloudinary;
    // public function __construct(Cloudinary $Cloudinary){
    //     $this->Cloudinary = $Cloudinary;
    // }
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

        $list = products::create([
            'categories_id' => $data['categories_id'],
            'name_product' => $data['product'],
            'image' => $data['file'],
            'base_stock' => $data['quanlity'],
            'price_regular' => $data['price_regular'],
            'price_sale' => $data['price_sale'],
            'SKU' => 'KS@@',
            'description' => strip_tags($data['description']),
            'views' => 0
        ]);

        return $list->id;
        
    }
    public function Update($id, $data)
    {

        $id = products::findOrFail($id);

        $id->update([
            'categories_id' => $data['categories_id'], 
            'name_product' => $data['product'],
            'image' => $data['file'],
            'base_stock' => $data['quanlity'], 
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
