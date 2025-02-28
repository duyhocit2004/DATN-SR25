<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Size;
use Illuminate\Http\Request;

class ApiSizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Size::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $size = Size::create([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Thêm kích thước thành công', 'size' => $size], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $size = Size::query()->findOrFail($id);

        return response()->json(['data' => $size], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $size = Size::query()->findOrFail($id);

        $params = $request->all();

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $size->update($params);

        return response()->json(['message' => 'Cập nhật thành công', 'size' => $size], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $size = Size::query()->findOrFail($id);

        $size->delete();

        return response()->json(['message' => 'Đã xóa thành công'], 200);
    }
}
