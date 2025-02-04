<?php 
    
    namespace App\Repositories;

use App\Models\categories;

    class CategoryReposoties{
        public function Getall(){
            return categories::all();
        }
    }