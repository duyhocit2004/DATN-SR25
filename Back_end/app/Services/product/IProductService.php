<?php 
namespace App\Services\product;

interface IProductService {
    public function getAllproduct();
    public function Getpaginate();
    public function insert($data);

    public function GetId($id);
    public function insertId($id,$data);

    public function delete($id);
    public function trashedProducts();
    public function restoreProduct($id);
    public function forceDelete($id);
}