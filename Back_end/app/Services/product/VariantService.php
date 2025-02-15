<?php

namespace App\Services\Product;

use App\Repositories\VariantRepositories;
class VariantService implements IVariantService
{
   public $VariantRepositories;
   public function __construct(VariantRepositories $VariantRepositories)
   {
      $this->VariantRepositories = $VariantRepositories;
   }
   public function getAllproduct()
   {

   }
   public function Getpaginate()
   {
      $list = $this->VariantRepositories->getall();
      return $list;
   }
   public function insert($id, $data)
   {
         $list =$this->VariantRepositories->create($id, $data);
         return $list;
   }
   public function create($data){
      $list = $this->VariantRepositories->CreateVariant($data);

      return $list;
   }

   public function GetId($id)
   {
      $list =$this->VariantRepositories->getid($id);
         return $list;
   }
   public function insertId($id, $data)
   {
      // dd($id);
      $this->VariantRepositories->updateVariant($id,$data);
      return redirect()->route('variant.index')->with('cusses','sửa biến thể sản phẩm thành công');
   }

   public function delete($id)
   {
   }
}