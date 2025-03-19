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


}
