<?php 
namespace App\Services\Color;

interface IColorService {
    public function getAll();
    public function insert($data);

    public function GetId($id);
    public function insertId($id,$data);

    public function delete($id);
}

