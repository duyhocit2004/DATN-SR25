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
   }
   public function insert($id, $data)
   {
         $list =$this->VariantRepositories->create($id, $data);
         return $list;
   }

   public function GetId($id)
   {
      $list =$this->VariantRepositories->getid($id);
         return $list;
   }
   public function insertId($id, $data)
   {
   }

   public function delete($id)
   {
   }
}