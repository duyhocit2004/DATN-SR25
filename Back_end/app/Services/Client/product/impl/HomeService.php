<?php

namespace App\Services\Client\product\impl;

use App\Repositories\BannersRepositories;
use App\Repositories\CategoriesRepositories;
use App\Services\Client\product\IHomeService;
use Illuminate\Http\Request;


class HomeService implements IHomeService
{
    public CategoriesRepositories $categoriesRepositories;
    public BannersRepositories $bannersRepositories;

    public function __construct(BannersRepositories    $bannersRepositories,
                                CategoriesRepositories $categoriesRepositories)
    {
        $this->bannersRepositories = $bannersRepositories;
        $this->categoriesRepositories = $categoriesRepositories;
    }



}
