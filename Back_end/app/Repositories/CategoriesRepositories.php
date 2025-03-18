<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Banner;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesRepositories
{
    public function getAllCategories()
    {
        $categories = Category::with('children')->whereNull('parent_id')->get();
        return $categories;
    }

    public function getParentCategories()
    {
        $categories = Category::whereNull('parent_id')->get();
        return $categories;
    }

    public function getChildrenCategories($parentId)
    {
        if (!is_null($parentId)) {
            $categories = Category::query()->where('parent_id', '=', $parentId)->get();
            return $categories;
        } else {
            $categories = Category::whereNotNull('parent_id')->get();
            return $categories;
        }
    }
}
