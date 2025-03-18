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

    public function getAllCategoriesNonTree(Request $request)
    {
        $perPage = $request->input('pageSize', 10);
        $page = $request->input('pageNum', 1);
        $categoriesId = $request->input('categoriesId', null);
        $name = $request->input('name', null);
        $parentId = $request->input('parentId', null);

        $query = Category::query()->with('parent:id,name');
        if (!empty($categoriesId)) {
            $query->where('id', '=', $categoriesId);
        }

        if (!empty($parentId)) {
            $query->where('parent_id', '=', $parentId);
        }

        if (!empty($name)) {
            $query->where('name', 'like', '%' . $name . '%');
        }

        $categories = $query->paginate($perPage, ['*'], 'page', $page);
        return $categories;
    }
}
