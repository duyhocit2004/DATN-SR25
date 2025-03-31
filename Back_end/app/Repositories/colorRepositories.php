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

    public function addColor(Request $request)
    {
        $color = Color::create([
            'code' => $request->input('color'),
        ]);
        return $color;
    }

    public function updateColor(Request $request)
    {
        $color= Color::find($request->input('id'));

        if (!$color) {
            BaseResponse::failure('400', 'color not found', 'color.not.found', []);
        }

        $color->update([
            'code' => $request->input('color', $color->code),
        ]);

        return $color;
    }

    public function deleteColor(Request $request)
    {
        $color= Color::find($request->input('id'));

        if (!$color) {
            BaseResponse::failure('400', 'color not found', 'color.not.found', []);
        }

        $color->delete();

        return $color;
    }

}
