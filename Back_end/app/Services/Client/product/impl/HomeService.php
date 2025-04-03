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

    public function getAllCategories()
    {
        $categories = $this->categoriesRepositories->getAllCategories();
//        $this->loadChildren($categories);
        return $categories;
    }

    //    private function loadChildren($categories)
//    {
//        foreach ($categories as $category) {
//            if ($category->children->count() > 0) {
//                $this->loadChildren($category->children);
//            }
//        }
//    }


    public function getParentCategories()
    {
        $categories = $this->categoriesRepositories->getParentCategories();
        return $categories;
    }

    public function getChildrenCategories(Request $request)
    {
        $parentId = $request->input('parentId');
        $categories = $this->categoriesRepositories->getChildrenCategories($parentId);
        return $categories;
    }

    public function getAllBanners(Request $request)
    {
        $pageNum = $request->get('pageNum', null);
        $pageSize = $request->get('pageSize', null);
        if (empty($pageNum) || empty($pageSize)) {
            $listBanner = $this->bannersRepositories->getAllBanner();
            return $listBanner;
        } else {
            $listBanner = $this->bannersRepositories->getBannerPaging($request);
            return $listBanner;
        }
    }

}
