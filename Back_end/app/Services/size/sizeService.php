<?php 

namespace App\Services\size;

use App\Repositories\SizeRepositories;

 class sizeService {
    public $SizeRepositories ; 
    public function __construct(SizeRepositories $SizeRepositories ){
        $this->SizeRepositories = $SizeRepositories;
    } 
    public function Getall() {
        $list = $this->SizeRepositories->GetAll();
        return $list;
    }
 }