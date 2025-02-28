<?php

namespace App\Http\Controllers\Api;

use App\Models\color;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(color::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $color = Color::create([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Thêm màu thành công', 'color' => $color], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $color = color::query()->findOrFail($id);

        return response()->json(['data' => $color], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $color = color::query()->findOrFail($id);

        $params = $request->all();

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $color->update($params);

        return response()->json(['message' => 'Cập nhật thành công', 'user' => $color], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $color = color::query()->findOrFail($id);

        $color->delete();

        return response()->json(['message' => 'Đã xóa thành công'], 200);
    }
}
