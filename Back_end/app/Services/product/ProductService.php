<?php
  namespace App\Services\product;

  use App\Services\product\IProductService;
  use  App\Repositories\ProductRepositories;

  class ProductService implements IProductService {
    public $IProductService;
    public function __construct(ProductRepositories $iProductService){
      $this->IProductService = $iProductService;
    }
    public function getAllproduct(){
      $list = $this->IProductService->getAll();
      // dd($list);
      return $list;
    }
    public function Getpaginate(){
      $list = $this->IProductService->getpaginate();
      return $list ;
    }
    public function insert($data){}

    public function GetId($id){}
    public function insertId($id,$data){}

    public function delete($id){}
  }
