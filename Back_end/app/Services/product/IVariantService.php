<?php 

namespace App\Services\Product; 
interface IVariantService {
    public function getAllproduct();
    public function Getpaginate();
    public function insert($id,$data);

    public function GetId($id);
    public function insertId($id,$data);

    public function delete($id);
}