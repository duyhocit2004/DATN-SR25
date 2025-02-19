<?php

namespace App\Repositories;

use App\Models\size;

class SizeRepositories {

    public function getAll()
    {
        return Size::all();
    }

    public function getById($id)
    {
        return Size::find($id);
    }

    public function insert($name)
    {
        return Size::create(['name' => $name]);
    }

    public function updateById($id, $data)
    {
        return Size::where('id', $id)->update($data);
    }

    public function deleteById($id)
    {
        return Size::destroy($id);
    }
}
