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
        $name = $request->get('name', null);
        // $code = $request->get('code', null);
        $page = $request->get('pageNum', 1);
        $perPage = $request->get('pageSize', 10);

        $query = Color::query();
        
        if (!empty($name)) {
            $query->where('name', 'like', '%' . $name . '%');
        }
        
        // if (!empty($code)) {
        //     $query->where('code', '=', $code);
        // }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function addColor(Request $request)
    {
        // Check if color name already exists
        $existingColor = Color::where('name', $request->input('name'))->first();
        if ($existingColor) {
            return BaseResponse::failure('400', 'Màu này đã tồn tại trong hệ thống', 'color.already.exists', []);
        }

        $color = Color::create([
            'name' => $request->input('name'),
        ]);
        return $color;
    }

    public function updateColor(Request $request)
    {
        $color = Color::find($request->input('id'));

        if (!$color) {
            return BaseResponse::failure('400', 'Màu sắc không tồn tại', 'color.not.found', []);
        }

        // Check if new name already exists for other colors
        $existingColor = Color::where('name', $request->input('name'))
            ->where('id', '!=', $color->id)
            ->first();
        if ($existingColor) {
            return BaseResponse::failure('400', 'Màu này đã tồn tại trong hệ thống', 'color.already.exists', []);
        }

        $color->update([
            'name' => $request->input('name', $color->name),
        ]);

        return $color;
    }

    public function deleteColor(Request $request)
    {
        $color = Color::find($request->input('id'));

        if (!$color) {
            return BaseResponse::failure('400', 'Màu sắc không tồn tại', 'color.not.found', []);
        }

        $color->delete();

        return $color;
    }
}
