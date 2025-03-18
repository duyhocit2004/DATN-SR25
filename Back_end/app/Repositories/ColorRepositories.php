<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorRepositories
{

    public function getAllColors()
    {
        $colors = Color::all();
        return $colors;
    }

    public function getColorsPaging(Request $request)
    {
        $color = $request->get('color', null);
        $page = $request->get('pageNum', 1);
        $perPage = $request->get('pageSize', 10);

        $query = Color::query();
        if (!empty($color)) {
            $query->where('code', '=', $color);
        }

        $colors = $query->paginate($perPage, ['*'], 'page', $page);
        return $colors;
    }

}
