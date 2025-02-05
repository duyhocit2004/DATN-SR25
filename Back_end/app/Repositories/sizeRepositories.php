<?php 

namespace App\Repositories;

use App\Models\size;

class SizeRepositories {
    
    public function GetAll(){
        return size::All();
    }
}