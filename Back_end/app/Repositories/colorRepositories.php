<?php

namespace App\Repositories;

use App\Models\color;
class ColorRepositories {

    public function Getall(){
        $getallcolor = color::all();
        return $getallcolor;
    }
    public function insert($data){

        // dd($data);
        return color::create([
            'name'=>$data
        ]);
    }
    public function Getone($id){
        return color::find($id);
    }

    public function update($id,$data){
        $findcolor = color::findOrFail($id);
        // dd($findcolor);
        if($findcolor){
            $findcolor->update($data);
            return true;
        }
        return false;
       
    }

    public function delete($id){
        // dd($id);
        $delete = color::find($id);
        $delete->delete();
        return $delete;
    }
}