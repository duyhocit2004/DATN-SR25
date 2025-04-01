<?php

 namespace  App\Services\Client\categories;

use App\Repositories\CategoryReposoties;

class CategoryService{
    public $category ;
    public function __construct( CategoryReposoties $category){
        $this->category = $category ;
    }
    public function getAll(){
        $list = $this->category->Getall();
        return $list ;
    }

 }
