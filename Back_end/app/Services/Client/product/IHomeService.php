<?php
namespace App\Services\Client\product;



use Illuminate\Http\Request;

interface IHomeService {
    public function getAllCategories();
    public function getParentCategories();
    public function getChildrenCategories(Request $request);
    public function getAllBanners(Request $request);

}
