<?php

namespace App\Repositories;

use App\Models\products;

class ProductRepositories {
    public function GetAll(){
        $list = products::get();
        return $list;
    }
    public function getpaginate(){
        $list = products::paginate(5);
        return $list;
    }

    public function GetOne($id){
        $list = products::findOrFail($id);
        return $list; 
    }

    public function create($data){
        products::create($data);
        return true;
    }
    public function Update($id,$data) {
    
    }
}

