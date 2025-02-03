<?php

namespace App\Services\color;


use App\Models\color;
use App\Repositories\ColorRepositories;

class ColorService implements IColorService  {

    public $ColorRepositories ;
    public function __construct(ColorRepositories $ColorRepositories){

          $this->ColorRepositories = $ColorRepositories ;
    }

    public function getAll() {
        $color = $this->ColorRepositories->getAll();
        return $color;
    }
    public function insert($data){

        try {
            $this->ColorRepositories->insert($data);
            return redirect()->route('color')->with('success', 'Thêm màu sắc thành công');
        } catch (\Throwable $th) {
            return redirect()->route('createcolor')->with('failed', $th->getMessage());
        }
    }

    public function GetId($id){
        $colorGetid = $this->ColorRepositories->Getone($id);
        return $colorGetid;

    }
    public function insertId($id,$data){
       
        $id1 = $this->ColorRepositories->Getone($id);
        // $this->ColorRepositories->update($id1,$data);
        
         // id kiểm tra id có tồn tại hay không
         // nếu tồn tại thì thực hiên chức năng xóa
        if($id1){
            $id1->update($data);
            return redirect()->route('color')->with('sucssess','thêm thành công');

        }else{
            return redirect()->back()->with('succsess','thêm không thành công');
        }
    }

    public function delete($id){
        try {
            
            $this->ColorRepositories->delete($id);
            return redirect()->route('color')->with('xóa thành công');
        } catch (\Throwable $th) {
            return redirect()->route('color')->with('danger',$th->getMessage());
        }
    }


}