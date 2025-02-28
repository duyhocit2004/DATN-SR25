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
    public function createNotForeach($idproduct,$value){
      $list = $this->VariantRepositories->createNotForeach($idproduct,$value);

      return $list;
    }
   public function GetId($id)
   {
      $list =$this->VariantRepositories->getid($id);
         return $list;
   }
   public function insertId($id, $data)
   {
      return $this->VariantRepositories->updateVariant($id,$data);
   }

   public function delete($id)
   {
   }
}