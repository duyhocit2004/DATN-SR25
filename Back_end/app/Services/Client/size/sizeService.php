<?php

namespace App\Services\Client\size;

use App\Repositories\SizeRepositories;

class SizeService
{
    protected $sizeRepositories;

    public function __construct(SizeRepositories $sizeRepositories)
    {
        $this->sizeRepositories = $sizeRepositories;
    }

    public function getAll()
    {
        return $this->sizeRepositories->getAll();
    }

    public function getBySize($id)
    {
        return $this->sizeRepositories->getById($id);
    }

    public function insert($name)
    {
        return $this->sizeRepositories->insert($name);
    }

    public function updateById($id, $data)
    {
        return $this->sizeRepositories->updateById($id, $data);
    }

    public function deleteById($id)
    {
        return $this->sizeRepositories->deleteById($id);
    }
}
